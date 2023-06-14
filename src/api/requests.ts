import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";

const client = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

const tokenSchema = z.object({
  data: z.string(),
});

const loginRequest = async (code: string): Promise<string | null> => {
  try {
    const response = await client.post("api/login", { code });
    console.log("response in login", response);

    const result = tokenSchema.safeParse(response);
    console.log("result in login", result);
    if (result.success === false) return null;
    const token = result.data.data;
    $token.next(token);
    console.log("token in login", token);
    localStorage.setItem("token", token);
    return result.data.data;
    //a tokent frissitem
  } catch (error) {
    return null;
  }
};

const recommendationSchema = z.object({
  artist: z.string(),
  name: z.string(),
  uri: z.string(),
});

const playlistSchema = z.object({
  user: z.string(),
  name: z.string(),
  description: z.string(),
  spotifyId: z.string(),
  spotify: z.string(),
  tracks: z.array(recommendationSchema),
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

// const playlistSpotifySchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   spotify: z.string(),
//   tracks: z.array(recommendationSchema),
// });

const recommendationsSchema = z.array(recommendationSchema);

type RecommendationSchema = z.infer<typeof recommendationSchema>;

type PlaylistSchema = z.infer<typeof playlistSchema>;

// type PlaylistSpotifySchema = z.infer<typeof playlistSpotifySchema>;

const $token = new BehaviorSubject<string | null>(
  localStorage.getItem("token")
);

let tokenTimeout: number | null = null;

const endSession = () => {
  //az endsession is mehet a token feliratkozasra
  localStorage.removeItem("token");
  $token.next(null);
};

$token.subscribe((token) => {
  if (tokenTimeout) clearTimeout(tokenTimeout);
  if (!token) return;
  const decoded = jwt_decode(token) as any;
  tokenTimeout = window.setTimeout(endSession,(decoded.exp*1000- new Date().getTime()));

});

// $token.subscribe((token) => {
//   if (tokenTimeout) clearTimeout(tokenTimeout);
//   tokenTimeout = window.setTimeout(() => {
//     if (!token) return;
//     const decoded = jwt_decode(token) as any;
//     if (decoded.exp * 1000 < new Date().getTime()) {
//       endSession();
//     }
//   }, 1000);
// });

//feliratkozom a tokenre hogy ha lejart tuntesse el ha valtozik akkor mentsem a localstorigaba


const get = async (path: string) => {
  try {
    const response = await client.get(path, {
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      endSession();
    }
  }
};

const recommendationRequest = async (
  id: string,
  color: string
): Promise<RecommendationSchema[] | null> => {
  try {
    const response = await client.post(
      "api/playlist/recommendations",
      {
        user: id,
        // name: "proba5000",
        // description: "spotify proba",
        seed_genres: color,
        target_danceability: 0.6,
        // min_instrumentalness: 0.2,
        // max_instrumentalness: 0.8,
        // min_popularity: 50,
        min_tempo: 120,
        max_tempo: 200,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    const result = recommendationsSchema.safeParse(response.data);
    console.log("response in recommendationRequest", response.data);
    console.log("result in recommendationRequest", result);
    if (result.success === false) {
      console.log(result);
      return null;
    }
    console.log(result.data);
    return result.data;
  } catch (error) {
    return null;
  }
};

const createRequest = async (
  id: string,
  name: string,
  tracks: string[]
): Promise<PlaylistSchema | null> => {
  console.log(tracks, name);
  try {
    const response = await client.post(
      "api/playlist",
      {
        user: id,
        name: name,
        // name: "proba5000",
        description: "spotify proba",
        tracks: tracks,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    const result = playlistSchema.safeParse(response.data);
    console.log("response in login", response.data);
    console.log("result in login", result);
    if (result.success === false) {
      console.log(result);
      return null;
    }
    console.log(result.data);
    return result.data;
  } catch (error) {
    return null;
  }
};

const getLibraryRequest = async (): Promise<PlaylistSchema[] | null> => {
  const data = await get(`api/playlist`);
  console.log(data);
  return data;
};

const getPlaylistRequest = async (
  id: string
): Promise<PlaylistSchema | null> => {
  const data = await get(`api/playlist/${id}`);
  console.log(data);
  return data;
};

const deletePlaylistRequest = async (id: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.delete(`api/playlist/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (error) {
    return null;
  }
};
const deleteAccountRequest = async (id: string): Promise<string | null> => {
  try {
    const response = await client.delete(`api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export {
  loginRequest,
  recommendationRequest,
  createRequest,
  getLibraryRequest,
  getPlaylistRequest,
  deletePlaylistRequest,
  deleteAccountRequest,
  $token,
  endSession,
};

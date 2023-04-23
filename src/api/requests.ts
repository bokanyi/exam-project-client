import axios, { Axios, AxiosError } from "axios";
import {optional, z} from "zod"
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";


const client = axios.create({baseURL: "http://localhost:8000/"})

const tokenSchema = z.object({
    data: z.string()
})

const loginRequest = async (code: string): Promise<string | null>=> {
   try {
    const response = await client.post("api/login", {code})
    console.log("response in login", response)

    const result = tokenSchema.safeParse(response)
    console.log("result in login", result)
    if (result.success===false) return null
    console.log(result.data)
    return result.data.data
    
   } catch (error) {
    return null
   } 
}
const recommendationSchema = z.object({
    artist: z.string(),
    name: z.string(),
    uri: z.string()
})

const playlistMongoSchema = z.object({
    user: z.string(),
    name: z.string(),
    description: z.string(),
    spotifyId: z.string(),
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v:z.number(),
})

const playlistSpotifySchema = z.object({
    name: z.string(),
    description: z.string(),
    spotify: z.string(),
    tracks: z.array(recommendationSchema)
})


const recommendationsSchema = z.array(recommendationSchema)

type RecommendationSchema = z.infer<typeof recommendationSchema> 

type PlaylistMongoSchema = z.infer<typeof playlistMongoSchema>

type PlaylistSpotifySchema = z.infer<typeof playlistSpotifySchema>


const $token = new BehaviorSubject<string | null>(
    localStorage.getItem("token")
  );

const endSession = () => {
    localStorage.removeItem("token")
    $token.next(null)
}

const get = async (path: string) => {
    try {
      const response = await client.get(path, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("token")}`,
        },
      });
      return response.data
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        endSession()
      }
    }
  }

const recommendationRequest = async (id: string): Promise< RecommendationSchema[] | null>=> {
   try {
    const response = await client.post("api/playlist/recommendations", {
        user: id,
        // name: "proba5000",
        // description: "spotify proba",
        seed_genres: "techno, classical",
        target_danceability: 0.6,
        min_instrumentalness: 0.2,
        max_instrumentalness: 0.8,
        min_popularity: 50,
        min_tempo: 120,
        max_tempo: 200
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    
    const result = recommendationsSchema.safeParse(response.data)
    console.log("response in recommendationRequest", response.data)
    console.log("result in recommendationRequest", result)
    if (result.success===false){ 
        console.log(result)
        return null}
    console.log(result.data)
    return result.data
   } catch (error) {
    return null
   } 
}

const createRequest = async (id: string,  name: string, tracks: string[]): Promise< PlaylistMongoSchema | null>=> {
  console.log(tracks, name)
  try {
   const response = await client.post("api/playlist", {
      user: id,
      name: name,
      // name: "proba5000",
      description: "spotify proba",
      tracks: tracks
   },
   { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
   const result = playlistMongoSchema.safeParse(response.data)
   console.log("response in login", response.data)
   console.log("result in login", result)
   if (result.success===false){ 
       console.log(result)
       return null}
   console.log(result.data)
   return result.data
   
  } catch (error) {
   return null
  } 
}
const getLibraryRequest = async (): Promise< PlaylistMongoSchema[] | null>=> {
   
    const data = await get(`api/playlist`)
    console.log(data);
    return data
   /*
    try {
     const response = await client.get("api/playlist",
     { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
     console.log(response.data)
    //  const result = playlistSchema.safeParse(response)
     // console.log("response in login", response)
     // console.log("result in login", result)
    //  if (result.success===false) return null
    //  console.log(result.data)
     return response.data
    } catch (error) {
     return null
    } 
    */
 }

const getPlaylistRequest = async (id: string): Promise< PlaylistSpotifySchema | null>=> {

    const data = await get(`api/playlist/${id}`)
    console.log(data);
    return data
    /*
    try {
     const response = await client.get(`api/playlist/${id}`,
     { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
     console.log(response.data)
    //  const result = playlistSchema.safeParse(response)
     // console.log("response in login", response)
     // console.log("result in login", result)
    //  if (result.success===false) return null
    //  console.log(result.data)
     return response.data
    } catch (error) {
     return null
    } 
    */
 }

const deletePlaylistRequest = async (id: string): Promise< string | null>=> {
    try {
     const response = await client.delete(`api/playlist/${id}`,
     { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
     return response.data
    } catch (error) {
     return null
    } 

 }
const deleteAccountRequest = async (user: string): Promise< string | null>=> {
    try {
     const response = await client.delete(`api/user`,
     {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      data: {
        user: user
      }
    })
     return response.data
    } catch (error) {
     return null
    } 
 }



 export { loginRequest, recommendationRequest, createRequest, getLibraryRequest, getPlaylistRequest, deletePlaylistRequest, deleteAccountRequest, $token, endSession }
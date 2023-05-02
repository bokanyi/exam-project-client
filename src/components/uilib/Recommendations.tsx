import { useState } from "react";
import useGlobal from "../../hooks/useGlobal";
import { $user } from "../../states/user";
import { $tracks, createPlaylist } from "../../states/playlist";
// import { createRequest } from "../../api/requests";
import { navigate } from "../../states/routes";

export const Recommendations = () => {
  const user = useGlobal($user);

  const tracks = useGlobal($tracks);

  const [playlistName, setPlaylistName] = useState("YOUR PLAYLIST");
  const tracksUri = tracks.map((track) => track.uri);

  return (
    <div className="recommendations">
      <div>
        <input
          type="text"
          placeholder="YOUR PLAYLIST"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </div>

      <div className="trackList">
        {tracks.map((track) => {
          return (
            <div  style={{ padding: "0em 1em" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.2em",
                }}
              >
                <p>{track.artist}</p>
                <div className="trackName">
                  <p>{track.name}</p>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div
      >
        <button onClick={() => $tracks.next([])}>BACK</button>
        <button
          onClick={() => {
            createPlaylist(user?._id, playlistName, tracksUri), $tracks.next([]), 
            navigate("/library")
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

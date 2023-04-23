import React, { useState } from "react";
import { createRequest } from "../../api/requests";
import useGlobal from "../../hooks/useGlobal";
import { $user, login, logout } from "../../states/user";
import {
  $tracks,
  getTracks,
} from "../../states/playlist";
import { Playlist } from "../uilib/Playlist";
import { $modal, handleModal} from "../../states/modal"


export const Generate = () => {
  const user = useGlobal($user);
  const tracks = useGlobal($tracks);
  const [playlistName, setPlaylistName] = useState("your playlist")

  const tracksUri = tracks.map((track) => track.uri)
  console.log(tracks);
  return (
    <div style={{zIndex: 1}}>
      {tracks.length > 0 ? (
        <div>
          <input type="text" placeholder="your playlist" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}/>
          <Playlist />
          <button onClick={() => {
            createRequest(user?._id, playlistName, tracksUri),
            $tracks.next([])}
            }>save</button>
          <button onClick={() => $tracks.next([])}>back</button>
        </div>
      ) : (
        <button onClick={() => getTracks(user?._id)}>Generate</button>
      )}
    </div>
  );
};

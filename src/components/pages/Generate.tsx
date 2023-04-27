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
import { $geometry, $color, setScale, setColor } from "../../states/geometry"


export const Generate = () => {
  const user = useGlobal($user);
  const tracks = useGlobal($tracks);
  const geometry = useGlobal($geometry)
  const color = useGlobal($color)
  const [playlistName, setPlaylistName] = useState("your playlist")
  // const [volumeValue, setVolumeValue] = useState("5")

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
        <div>
        <div>
          <input type="range" id="volume" name="volume" value={geometry?.scale}
                min="1" max="10"onChange={(e)=> {setScale(e.target.value), console.log(geometry)}}/>
          <label >Volume</label>
        </div>

        <div>
          <input type="range" id="volume" name="volume" value={color}
                min={0} max={360} onChange={(e)=> {setColor(e.target.value), console.log(color)}}/>
          <label >Color</label>
        </div>
        
          <button onClick={() => getTracks(user?._id, color)}>Generate</button>
        </div>
      )}
    </div>
  );
};

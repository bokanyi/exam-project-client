import React, { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import {
  $library,
  $playlist,
  getLibrary,
  getPlaylist,
  deletePlaylist,
} from "../../states/playlist";
import { Playlist } from "../uilib/Playlist";
import { $modal, handleModal } from "../../states/modal";

export const Library = () => {
  const library = useGlobal($library);
  const modal = useGlobal($modal);
  const playlist = useGlobal($playlist);

  useEffect(() => {
    getLibrary();
  }, [])
  
  const handleClick = async (id: string) => {
    try {
      const response = await deletePlaylist(id)
      console.log(response)
      // getLibrary();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{    
        zIndex: 1,
      }}
    >

      <div className="library" >
        {library.map((playlist) => {
          return (
            <div>

            <div className="libraryItem" >

              <p style={{fontWeight: "700", cursor: "pointer"}}onClick={() => (getPlaylist(playlist._id), handleModal("playlist"))}>
                {playlist.name}
              </p>
              <div style={{display: "flex" , gap: "1em", alignItems: "center"}}>

              <p>{playlist.createdAt.split("T")[0]}</p>
              <button
                onClick={() => handleClick(playlist._id)}
              >
                DELETE
              </button>
              </div>
            </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

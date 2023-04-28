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

  

  return (
    <div
      style={{
        // position: "relative",
        // display: "flex",
        zIndex: 1,
        // margin: "auto"
      }}
    >
      {/* {modal && (
        <div className="wrapper">
          <div className="popup">
            <p>{playlist?.name}</p>
            <div>
              <Playlist />
              <button
                onClick={() => {
                  handleModal();
                }}
              >
                back
              </button>
              <button>
                <a href={playlist?.spotify} target="blank">
                  listen on spotify
                </a>
              </button>
            </div>
          </div>
        </div>
      )} */}

      <div
        style={
          {
            // position: "relative",
          }
        }
      >
        {library.map((playlist) => {
          return (
            <div style={{ display: "flex" }}>
              <p onClick={() => (getPlaylist(playlist._id), handleModal("playlist"))}>
                {playlist.name}
              </p>
              <p>{playlist.createdAt.split("T")[0]}</p>
              <button
                onClick={() => {
                  deletePlaylist(playlist._id), getLibrary();
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

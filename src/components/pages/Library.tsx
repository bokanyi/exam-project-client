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

  const handleClickOutside = () => {
    console.log("clicked")
    handleModal();
  };

  // const useOutsideClick = (callback: Function) => {
  //   const ref = React.useRef();
  
  //   React.useEffect(() => {
  //     const handleClick = (event: Event ) => {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //       callback();
  //       }
  //     };
  
  //     document.addEventListener('click', handleClick);
  
  //     return () => {
  //       document.removeEventListener('click', handleClick);
  //     };
  //   }, [ref]);
  
  //   return ref;
  // };



  // const ref = useOutsideClick(handleClickOutside);

    const ref = React.useRef();

  useEffect(() => {
    window.onclick = (event: Event) => {
      if (event.target.contains(ref.current)
        && event.target !== ref.current) {     
        console.log(`You clicked Outside the box!`);
      } else {     
        console.log(`You clicked Inside the box!`);
      }
    }
}, []);


  return (
    <div style={{ zIndex: 1 }}>
      {modal && (
        <div ref={ref} className="popup">
          <p>{playlist?.name}</p>
          <div>
            <Playlist />
            <button onClick={() => {handleModal()}}>
              back
            </button>
            <button>
              <a href={playlist?.spotify} target="blank">
                listen on spotify
              </a>
            </button>
          </div>
        </div>
      )}

      {library.map((playlist) => {
        return (
          <div style={{ display: "flex",}} >
            <p onClick={() => (getPlaylist(playlist._id), handleModal())}>
              {playlist.name}
            </p>
            <p>{playlist.createdAt.split("T")[0]}</p>
            <button onClick={() => {deletePlaylist(playlist._id), getLibrary()}} >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

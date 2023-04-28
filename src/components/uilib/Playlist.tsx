import useGlobal from "../../hooks/useGlobal";
import {
  $tracks,
  $playlist,
} from "../../states/playlist";
// import { Playlist } from "../../uilb/Playlist";
import { $modal, handleModal } from "../../states/modal";
import React, { useEffect, useRef} from "react";

export const Playlist = () => {

  const playlist = useGlobal($playlist);
  const tracks = useGlobal($tracks);
  const modal = useGlobal($modal)

  /*
  const handleClickOutside = () => {
    console.log("clicked");
    handleModal("");
  };
  


  const useOutsideClick =  (callback: Function) => {
    const ref = React.useRef();
    let click = 1
    useEffect(() => {
       const  handleClick = (event: Event ) => {
         if (click ===0 && ref.current && !ref.current.contains(event.target)) {
           console.log("clicked inside handleclick")
           callback();
          }
          else click=0
        };
        
        document.addEventListener('click', handleClick);
        
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, [ref]);
      
      
    return ref;
  };

  const ref = useOutsideClick(handleClickOutside);
*/
  const ref = useRef();

  useEffect(() => {
    let click =1
    window.onclick = (event: Event) => {
      if (click ===0 && ref.current && !ref.current.contains(event.target)) {
        
        handleModal("");
      } else {
        click=0
      }
    };
  }, []);


  return (
    <div ref={ref} className="popup">
      <p>{playlist?.name}</p>
      <div>
      {tracks.map((track) => {
          return (
            <>
            <div style={{display: "flex", justifyContent: "space-between",}}>
              <p>{track.artist}</p>
              <p>{track.name}</p>
            </div>
            <hr />
            </>
          )
        })}
        <button
          onClick={() => {
            handleModal("");
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
  
  )
}

import useGlobal from "../../hooks/useGlobal";
import {
  $tracks,
  $playlist,
} from "../../states/playlist";
import { $modal, handleModal } from "../../states/modal";
import  { useEffect, useRef} from "react";

export const Playlist = () => {

  const playlist = useGlobal($playlist);
  const tracks = useGlobal($tracks);
  const modal = useGlobal($modal)

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
      <h1>{playlist?.name}</h1>
      <div>
      {tracks.map((track) => {
          return (
            <>
            <div key={track.uri} style={{display: "flex", justifyContent: "space-between",}}>
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
          BACK
        </button>
        <button>
          <a href={playlist?.spotify} target="blank">
            LISTEN ON SPOTIFY
          </a>
        </button>
      </div>
    </div>
  
  )
}

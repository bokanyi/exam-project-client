import {useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import {
  $library,
  getLibrary,
  getPlaylist,
} from "../../states/playlist";
import { handleModal } from "../../states/modal";

export const Library = () => {
  const library = useGlobal($library);

  useEffect(() => {
    getLibrary();
  }, [])
  


  return (
    <div
      style={{    
        zIndex: 1,
      }}
    >

      <div className="library" >
        {library.map((playlist) => {
          return (
            <div key={playlist._id} >

            <div className="libraryItem" >

              <p style={{fontWeight: "700", cursor: "pointer"}}onClick={() => (getPlaylist(playlist._id), handleModal("playlist"))}>
                {playlist.name}
              </p>
              <div style={{display: "flex" , gap: "1em", alignItems: "center"}}>

              <p>{playlist.createdAt.split("T")[0]}</p>
              <button
                onClick={() =>{
                  getPlaylist(playlist._id),
                  handleModal("confirm-playlist")
                }}
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

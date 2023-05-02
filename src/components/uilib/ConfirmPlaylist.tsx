import { useEffect, useRef } from "react";
import { handleModal } from "../../states/modal";
import useGlobal from "../../hooks/useGlobal";
import { $user, deleteAccount } from "../../states/user";
import {
    $library,
    $playlist,
    getLibrary,
    getPlaylist,
    deletePlaylist,
  } from "../../states/playlist";
  
  
  export default function ConfirmPanel() {
      
      const user = useGlobal($user);
      const playlist = useGlobal($playlist);

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
    <p>You can only delete this playlist in our database, but it will remain in your spotify lists.</p>
    <div>

    <button onClick={() => {deletePlaylist(playlist?._id),handleModal("")}}>DELETE</button>
    <button onClick={() => {handleModal("")}}>CANCEL</button>
    </div>
  </div>
  )
}

import { useEffect, useRef } from "react";
import { handleModal } from "../../states/modal";
import {  deleteAccount } from "../../states/user";


export default function ConfirmPanel() {


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
    <p>Are you sure you want to say goodbye?</p>
    <div>

    <button onClick={() => {deleteAccount(user?._id)}}>delete</button>
    <button onClick={() => {handleModal("")}}>no</button>
    </div>
  </div>
  )
}

import React, { useState } from "react";
import useGlobal from "../../hooks/useGlobal";
import { $user, deleteAccount, login, logout } from "../../states/user";
import { $modal, handleModal} from "../../states/modal"

export const Account = () => {
    
  const user = useGlobal($user);
  const modal = useGlobal($modal)

  return (
    <div style={{
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "start",
      // flexWrap: "nowrap",
      }}>
      
        {/* {modal && 
        <div className="popup">
          <p>Are you sure you want to say goodbye?</p>
          <div>

          <button onClick={() => {deleteAccount(user?._id)}}>delete</button>
          <button onClick={() => {handleModal()}}>no</button>
          </div>
        </div>
        } */}
        <p>name: {user?.display_name}</p>
        <p>email: {user?.email}</p>
        <p>spotify account: <a href={user?.spotify} target="blank">open in spotify </a></p>
        <div>

        <button onClick={() => {handleModal("confirm-panel")}}>delete account</button>
        <button onClick={logout}>log out</button>
        </div>
    </div>
  );
};

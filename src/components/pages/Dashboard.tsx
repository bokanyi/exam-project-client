import React, { useState } from "react";
import { $user, login, logout } from "../../states/user";
import { navigate } from "../../states/routes";
import useGlobal from "../../hooks/useGlobal";
import { createRequest } from "../../api/requests";
import {
  $library,
  getLibrary,
  getPlaylist,
  deletePlaylist,
} from "../../states/playlist";
import {Discover} from "./Discover"
import {Library} from "./Library"
import {Account} from "./Account"
import { Route } from "../Route";
import { Sphere } from "../Sphere";

export const Dashboard = () => {
  const user = useGlobal($user);
  const library = useGlobal($library);
  console.log(user);

  const [container, setContainer] = useState("generate")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <div>
        <div
          style={{
            // height: "500px",
            // width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "red",
            opacity: 0.2,
            justifyContent: "center",
            // filter:" blur(4px)",
          }}
        > 
           { container === "discover" && <Discover/>}
           { container === "library" && <Library/>}
           { container === "account" && <Account/>}
       
        </div>
        
          {/* <div>
            <button onClick={() => setContainer("discover")}>Discover</button>
            <button onClick={
              () => setContainer("generate")
              // () => createRequest(user?._id)
              }>Generate</button>
            <button onClick={() => {
              getLibrary(),
              setContainer("library")
            }
            }>Library</button>
            <button onClick={() => setContainer("account")} >Account</button>
          </div> */}
        </div>
    </div>
  );
};

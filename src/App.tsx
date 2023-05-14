import { useState } from "react";
import { Route } from "./components/Route";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import "./App.css";
import { Sphere } from "./components/Sphere";
import { Navigation } from "./components/Navigation";
import { Generate } from "./components/pages/Generate";
import { $user, login, logout } from "../src/states/user";
import { $modal } from "../src/states/modal";
import { navigate } from "../src/states/routes";
import useGlobal from "../src/hooks/useGlobal";
import { Account } from "./components/pages/Account";
import { Library } from "./components/pages/Library";
import { Discover } from "./components/pages/Discover";
import { Playlist } from "./components/uilib/Playlist";
import ConfirmAccount from "./components/uilib/ConfirmAccount";
import ConfirmPlaylist from "./components/uilib/ConfirmPlaylist";
import Object from "./components/uilib/Object"

const App = () => {
  const user = useGlobal($user);
  const modal = useGlobal($modal)

  // console.log(user);
  
  return (
    <div className="app">

      { modal.open && 
      <div className="wrapper">

      { (modal.content==="playlist") && <Playlist/>}


      {(modal.content === "confirm-playlist") && <ConfirmPlaylist/>}

      {(modal.content === "confirm-account") && <ConfirmAccount/>}



      </div>}

      <div className={`canvas ${modal.open ? 'blur ' : '' }`}>
        <Sphere />
      </div>

      <div className={`overlay ${modal.open ? 'blur ' : '' }`}>

        
       <Route path="/" hasAccess={true}> <Home /> </Route>

        <Route path="/discover" hasAccess={!!user}> <Discover/> </Route>

        <Route path="/generate" hasAccess={!!user}> <Generate/> </Route>

        <Route path="/account" hasAccess={!!user}> <Account/> </Route>

        <Route path="/library" hasAccess={!!user}>  <Library/> </Route>

        {user && <Navigation />}
      </div>
    </div>
  );
};

export default App;

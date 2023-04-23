import { useState } from "react";
import { Route } from "./components/Route";
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import "./App.css";
import { Dashboard } from "./components/pages/Dashboard";
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

const App = () => {
  const user = useGlobal($user);
  const modal = useGlobal($modal)

  // console.log(user);
  
  return (
    <div className="app">
      
      <div className={`canvas ${modal ? 'blur ' : '' }`}>
        <Sphere />
      </div>

      <div className="overlay">

        
       { !user && <Route path="/">
          <Home />
        </Route>}

        <Route path="/discover"> <Discover/> </Route>

        <Route path="/generate"> <Generate/> </Route>

        <Route path="/account"> <Account/> </Route>

        <Route path="/library">  <Library/> </Route>

        {user && <Navigation />}
      </div>
    </div>
  );
};

export default App;

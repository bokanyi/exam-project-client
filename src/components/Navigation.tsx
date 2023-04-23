import React from "react";
import { navigate } from "../states/routes";
import useGlobal from "../hooks/useGlobal";
import { getLibrary } from "../states/playlist";

export const Navigation = () => {
  return (
    <div className="navigation">
      <button onClick={() => navigate("/discover")}>Discover</button>
      <button onClick={() => navigate("/generate")}>Generate</button>
      <button onClick={() => { navigate("/library"), getLibrary()}}> Library </button>
      <button onClick={() => navigate("/account")}>Account</button>
    </div>
  );
};

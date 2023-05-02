import React from "react";
import { navigate } from "../states/routes";
import useGlobal from "../hooks/useGlobal";
import { getLibrary } from "../states/playlist";
import { CustomButton } from "./uilib/CustomButton";


export const Navigation = () => {
  return (
    <div className="navigation">
      <CustomButton onClick={() => navigate("/discover")} text= "DISCOVER"/>
      <CustomButton onClick={() => navigate("/generate")} text= "GENERATE"/>
      <CustomButton onClick={() => { navigate("/library"), getLibrary()}} text= "LIBRARY"/>
      <CustomButton onClick={() => navigate("/account")} text= "ACCOUNT"/>
      {/* <button onClick={() => navigate("/discover")}>DISCOVER</button> */}
      {/* <button onClick={() => navigate("/generate")}>GENERATE</button> */}
      {/* <button onClick={() => { navigate("/library"), getLibrary()}}> LIBRARY </button> */}
      {/* <button onClick={() => navigate("/account")}>ACCOUNT</button> */}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { AUTH_URL } from "../../config";

export const Home = () => {
  return (
    <div style={{zIndex: 1}}>
      <p>
        Create your own playlist with our 3D
        customization tool. <strong>Explore new fields of music</strong> and define
        your own style.
      </p>
      <button>
      <a style={{ textDecoration: "none"}}href={AUTH_URL}>Login with spotify</a>
      </button>
    </div>
  );
};

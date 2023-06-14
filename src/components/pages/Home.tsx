import { AUTH_URL } from "../../config";

export const Home = () => {
  return (
    <div className="home" style={{zIndex: 1}}>
      <div>

      <p>
        Create your own playlist with our 3D
        customization tool. <strong>Explore new fields of music</strong> and define
        your own style.
      </p>
      </div>
      <button>
      <a href={AUTH_URL}>Login with spotify</a>
      </button>
    </div>
  );
};

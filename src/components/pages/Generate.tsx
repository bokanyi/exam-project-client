import useGlobal from "../../hooks/useGlobal";
import { $user } from "../../states/user";
import { $tracks, getTracks } from "../../states/playlist";
import { $geometry, $color, setScale, setColor } from "../../states/geometry";
import { Recommendations } from "../uilib/Recommendations";

export const Generate = () => {
  const user = useGlobal($user);
  const tracks = useGlobal($tracks);
  const geometry = useGlobal($geometry);
  const color = useGlobal($color);

  if (!user) return null
  return (
    <div className="generate" style={{ zIndex: 1 }}>
      {tracks.length > 0 ? (
        <Recommendations />
      ) : (
        <div className="generateInput">
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              value={geometry?.scale}
              min="1"
              max="10"
              step="0.1"
              onChange={(e) => {
                setScale(e.target.value);
              }}
            />
          </div>
          <button onClick={() => getTracks(user._id, color)}>GENERATE</button>

          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              value={color}
              min={0}
              max={360}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

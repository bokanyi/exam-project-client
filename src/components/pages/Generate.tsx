import useGlobal from "../../hooks/useGlobal";
import { $user } from "../../states/user";
import {
  $tracks,
  getTracks,
} from "../../states/playlist";
import { $geometry, $color, setScale, setColor } from "../../states/geometry"
import { RangeInput } from "../uilib/RangeInput";
import { Recommendations } from "../uilib/Recommendations";


export const Generate = () => {
  const user = useGlobal($user);
  const tracks = useGlobal($tracks);
  const geometry = useGlobal($geometry)
  const color = useGlobal($color)

  // const [volumeValue, setVolumeValue] = useState("5")


  return (
    <div className="generate" style={{zIndex: 1}}>
      {tracks.length > 0 ? (
        <Recommendations/>
      ) : (
        <div className="generateInput">
          {/* <RangeInput/> */}
          
        <div >
          <input type="range" id="volume" name="volume" value={geometry?.scale}
                min="1" max="10"onChange={(e)=> {setScale(e.target.value)}}/>
          {/* <label >Volume</label> */}
        </div>
          <button onClick={() => getTracks(user?._id, color)}>GENERATE</button>

        <div>
          <input type="range" id="volume" name="volume" value={color}
                min={0} max={360} onChange={(e)=> {setColor(e.target.value)}}/>
          {/* <label >Color</label> */}
        </div>
        
        </div>
      )}
    </div>
  );
};

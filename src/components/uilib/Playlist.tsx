
import useGlobal from "../../hooks/useGlobal";
import { $tracks, getTracks } from "../../states/playlist";



export const Playlist = () => {

  const tracks = useGlobal($tracks);

  return (
    <div className="playlist" > Playlist
      {tracks.map((track) => {
          return (
            <>
            <div style={{display: "flex", justifyContent: "space-between",}}>
              <p>{track.artist}</p>
              <p>{track.name}</p>
            </div>
            <hr />
            </>
          )
        })}
    </div>
  )
}

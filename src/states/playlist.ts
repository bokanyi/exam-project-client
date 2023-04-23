import { BehaviorSubject } from "rxjs";
import {getLibraryRequest, getPlaylistRequest, deletePlaylistRequest, recommendationRequest} from "../api/requests"

type PlaylistMongo = {
    _id: string
    user: string
    name: string
    description: string
    spotifyId: string
    createdAt: string
    updatedAt: string
}

type Tracks ={
    artist: string,
    name: string,
    uri: string,
  }

type PlaylistSpotify = {
    name: string,
  description: string,
  spotify: string,
  tracks: Tracks[]
}
const $tracks = new BehaviorSubject <Tracks[]>([])

const $library = new BehaviorSubject <PlaylistMongo[]>([])

const $playlist = new BehaviorSubject < PlaylistSpotify | null>(null)


const getTracks = async (id: string) => {
    const tracks = await recommendationRequest(id)
    if (!tracks) return null
    $tracks.next(tracks)
}
const getLibrary = async () => {
    const library = await getLibraryRequest()
    if (!library) return null
    $library.next(library)
}

const getPlaylist = async (id: string) => {
    const playlist = await getPlaylistRequest(id)
    if (!playlist) return null
    $playlist.next(playlist)
    $tracks.next(playlist.tracks)
}

const deletePlaylist = async (id: string) => {
    const response = await deletePlaylistRequest(id)
    // if (!response) return null
    console.log(response)

}


export { $tracks, $library, $playlist, getLibrary, getPlaylist, deletePlaylist,  getTracks   }
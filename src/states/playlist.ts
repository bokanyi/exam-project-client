import { BehaviorSubject } from "rxjs";
import {getLibraryRequest, getPlaylistRequest, createRequest, deletePlaylistRequest, recommendationRequest} from "../api/requests"

/*
type PlaylistMongo = {
    _id: string
    user: string
    name: string
    description: string
    spotifyId: string
    createdAt: string
    updatedAt: string
}
*/

type Tracks ={
    artist: string,
    name: string,
    uri: string,
  }

type Playlist = {
    _id: string,
    user: string,
    name: string,
  description: string,
  spotify: string,
  spotifyId: string,
  tracks: Tracks[],
  createdAt: string,
  updatedAt: string,
}
const $tracks = new BehaviorSubject <Tracks[]>([])

const $library = new BehaviorSubject <Playlist[]>([])

const $playlist = new BehaviorSubject < Playlist | null>(null)


const getTracks = async (id: string, color:  string) => {
    const tracks = await recommendationRequest(id, color)
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

const createPlaylist = async (id: string,
    name: string,
    tracks: string[]) => {
    const playlist = await createRequest(id, name, tracks)
    getLibrary()
    return playlist
}

const deletePlaylist = async (id: string) => {
    const response = await deletePlaylistRequest(id)
    getLibrary()
    return response
}


export { $tracks, $library, $playlist, getLibrary, getPlaylist, createPlaylist, deletePlaylist,  getTracks }
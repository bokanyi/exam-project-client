

/*

import { BehaviorSubject } from "rxjs";
import {recommendationRequest} from "../api/requests"

type Tracks = {
    artist: string
    name: string
    uri: string
}

const $tracks = new BehaviorSubject <Tracks[]>([])

// const $playlist = new BehaviorSubject < Tracks | null>(null)

const getTracks = async (id: string) => {
    const tracks = await recommendationRequest(id)
    if (!tracks) return null
    $tracks.next(tracks)
}

// const createPlaylist = async (id: string) => {

//     const playlist = await createRequest(id)
//     if (!playlist) return null
//     $tracks.next(tracks)
// }

export { $tracks, getTracks }

*/
import axios from "axios"
import {z} from "zod"

const client = axios.create({baseURL: "http://localhost:8000/"})

const tokenSchema = z.object({
    data: z.string()
})

export const loginRequest = async (code: string): Promise<string | null>=> {
   try {
    const response = await client.post("api/login", {code})
    const result = tokenSchema.safeParse(response)
    // console.log("response in login", response)
    // console.log("result in login", result)
    if (result.success===false) return null
    console.log(result.data)
    return result.data.data
    
   } catch (error) {
    return null
   } 
}

const playlistSchema = z.object({
    user: z.string(),
    name: z.string(),
    spotifyId: z.string(),
    description: z.string(),
})

export const createRequest = async (): Promise<string | null>=> {
   try {
    const response = await client.post("api/playlist", {
        user: "643811c50be95317ea2091de",
        name: "proba2000",
        description: "spotify proba",
        seed_genres: "techno",
        target_danceability: 0.8,
        min_instrumentalness: 0.2,
        max_instrumentalness: 0.8,
        min_popularity: 50,
        min_tempo: 140,
        max_tempo: 200
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    const result = playlistSchema.safeParse(response)
    // console.log("response in login", response)
    // console.log("result in login", result)
    if (result.success===false) return null
    console.log(result.data)
    return response.data
    
   } catch (error) {
    return null
   } 
}
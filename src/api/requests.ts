import axios from "axios"
import {z} from "zod"

const client = axios.create({baseURL: "http://localhost:8000/"})

const ResponseSchema = z.object({
    data: z.string()
})

export const loginRequest = async (code: string): Promise<string | null>=> {
   try {
    const response = await client.post("api/login", {code})
    const result = ResponseSchema.safeParse(response)
    // console.log("response in login", response)
    // console.log("data in login", response.data)
    // console.log("result in login", result)
    if (result.success===false) return null
    console.log(result.data)
    return result.data.data
    
   } catch (error) {
    return null
   } 

}
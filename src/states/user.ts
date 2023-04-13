import { BehaviorSubject } from "rxjs";
import { loginRequest } from "../api/requests"
import jwt_decode from "jwt-decode";
import {z} from "zod"

const UserSchema = z.object({
    display_name: z.string(),
    email: z.string(),
    spotifyId: z.string(),
    _id: z.string()
})

type UserType = z.infer<typeof UserSchema>

const _user = new BehaviorSubject<UserType | null>(null)

export const $user = _user.asObservable()

export const login = async (code : string) => {
    const token = await loginRequest(code)
    console.log("userts token", token) 
    if (!token) return 
    const decoded = jwt_decode(token)
    console.log("userts decoded", decoded)
    const result = UserSchema.safeParse(decoded)
    if (result.success === false) return
    _user.next(result.data)
    localStorage.setItem("token", token)
}

export const logout = () => {
    localStorage.removeItem("token")
    _user.next(null)
}
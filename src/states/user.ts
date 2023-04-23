import { BehaviorSubject } from "rxjs";
import { loginRequest, $token, endSession, deleteAccountRequest } from "../api/requests";
import jwt_decode from "jwt-decode";
import { z } from "zod";
import { $path, navigate } from "./routes";

const UserSchema = z.object({
  display_name: z.string(),
  email: z.string(),
  spotifyId: z.string(),
  spotify: z.string(),
  _id: z.string(),
});

type UserType = z.infer<typeof UserSchema>;

const decodeUser = (token: string | null): UserType | null => {
  if (!token) return null;
  const decoded = jwt_decode(token);
  const result = UserSchema.safeParse(decoded);
  if (result.success === false) return null;
  return result.data;
};

const $user = new BehaviorSubject<UserType | null>(
  decodeUser($token.getValue())
);

$token.subscribe((token) => $user.next(decodeUser(token)));

const login = async (code: string) => {
  const token = await loginRequest(code);
  console.log(token);
  const user = decodeUser(token);
  console.log(user);
  if (!user) return navigate("/");
  $user.next(user);
  localStorage.setItem("token", token!);
  navigate("/generate");
};

$path.subscribe((path) => {
  if (path === "/login") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    if (code) login(code);
  }
});

$user.subscribe((user) => {
  if (!user) navigate("/");
});

const logout = () => {
  endSession();
};

const deleteAccount = async (user: string) => {
  const data = await deleteAccountRequest(user)
  endSession()
}

export { $user, login, logout, deleteAccount };

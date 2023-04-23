import { BehaviorSubject } from "rxjs";

export const $token = new BehaviorSubject(localStorage.getItem("token"))


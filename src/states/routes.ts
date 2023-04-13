import { BehaviorSubject } from "rxjs";

export const $path = new BehaviorSubject(window.location.pathname)

export const navigate = (nextPage: string) => {
    $path.next(nextPage)
    window.history.pushState({}, "", nextPage)
}

window.addEventListener("popstate", () => {
    $path.next(window.location.pathname)
})
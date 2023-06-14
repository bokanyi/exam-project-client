import { BehaviorSubject } from "rxjs";


type Geometry = {
    scale: string
}

const $geometry = new BehaviorSubject<Geometry>({
    scale: "2"
})

const $color = new BehaviorSubject("0")

const setScale = (value: string) => {
    $geometry.next({scale: value})
}

const setColor = (value: string) => {
    $color.next(value)
}

export {$geometry, $color, setScale, setColor}
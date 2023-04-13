import { FC, ReactNode } from "react"
import { $path } from "../states/routes"
import useGlobal from "../hooks/useGlobal"

type Props = {
    path: string
    children: ReactNode
}

export const Route: FC<Props> = ({path, children}) => {
    const currentPath = useGlobal($path, window.location.pathname)
    if (path != currentPath) return null
    return(
        <>{children}</>
    )
}
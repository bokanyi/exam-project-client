import { FC } from "react"
import useGlobal from "../../hooks/useGlobal";
import { $color } from "../../states/geometry"

type Props = {
    onClick: () => void
    text: string
}

export const CustomButton: FC<Props>= ({onClick, text}) => {

    const color = useGlobal($color)

  return (
    <button style={{color:`hsl(${360-parseInt(color)}, 60%, 70%)`}}onClick={onClick}> {text}</button>
  )
}

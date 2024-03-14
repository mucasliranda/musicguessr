import { useRef } from "react"

interface Props extends React.HTMLProps<HTMLAudioElement>{
  startAt: number;
}


export default function Player({
  startAt,
  ...props
}: Props) {
  const playerRef = useRef<HTMLAudioElement>(null)

  return (
    <div>
      <audio
        ref={playerRef}
        onPlay={() => {
          if (playerRef.current) {
            playerRef.current.currentTime = startAt / 1000
          }
        }}
        // preciso fazer que o audio toque somente 1 segundo e pare
        onTimeUpdate={() => {
          if (playerRef.current) {
            if (playerRef.current.currentTime - startAt / 1000 > 1.5) {
              playerRef.current.pause()
            }
          }
        }}
        {...props}
      />
    </div>
  )
}
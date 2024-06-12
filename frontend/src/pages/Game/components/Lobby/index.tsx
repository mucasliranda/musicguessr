import { Button } from "src/shared/components/Button";



export default function Lobby() {
  return (
    <main
      className="
        w-3/4 
        h-full

        p-4
      "
    >
      <h2
        className="
          text-3xl
          text-white
          font-bold
        "
      >
        Waiting for Players...
      </h2>

      <div
        className="
          w-full

          flex
          flex-col
          justify-center
          items-center
          gap-4
        "
      >
        <p
          className="
            text-base
            text-white
          "
        >
          Share the invite link with your friends to start the game!
        </p>

        <Button>
          Copy Invite Link
        </Button>
      </div>
    </main>
  )
}
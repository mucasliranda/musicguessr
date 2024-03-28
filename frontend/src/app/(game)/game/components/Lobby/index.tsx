'use client'



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
          h-full

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
        <button
          className="
            py-2
            px-6 
            rounded-md 
            
            text-sm
            text-white 
            bg-primary 
            
            hover:bg-[#1ed760]
            active:scale-95
          "
        >
          Copy Invite Link
        </button>
      </div>

    </main>
  )
}
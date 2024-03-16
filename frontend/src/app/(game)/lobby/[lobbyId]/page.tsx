import UserPhoto from "../../components/UserPhoto";



export default async function Lobby() {

  return (
    <div className="w-full max-w-screen-2xl h-screen flex">
      <div 
        className="
          w-1/4 
          h-full 
          p-4
          
          flex
          flex-col
          items-start
          bg-onBackground
        "
      >
        <h3 
          className="
            w-fit
            mb-6 
          
            text-white 
            text-lg
            border-b-[2px]
            border-primary
          "
        >
          Lobby
        </h3>

        <ul
          className="
            w-full

            mb-6

            flex
            flex-col
            gap-4
          "
        >
          <li
            className="
              flex
              justify-between

              pb-1
  
              border-b-[1px]
              border-[#646464]
            "
          >
            <p
              className="text-white"
            >
              Player Name
            </p>

            <UserPhoto />
          </li>

          <li
            className="
              flex
              justify-between

              pb-1
  
              border-b-[1px]
              border-[#646464]
            "
          >
            <p
              className="text-white"
            >
              Player Name
            </p>

            <UserPhoto />
          </li>
        </ul>

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
          Start Game
        </button>
      </div>

      <div 
        className="
          w-3/4 
          h-full

          p-8
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

      </div>
    </div>
  )
}
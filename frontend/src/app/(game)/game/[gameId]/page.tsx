import Button from "@/shared/components/Button";



export default async function Game() {

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
          Players Score
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

            <p
              className="text-white"
            >
              0
            </p>
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

            <p
              className="text-white"
            >
              0
            </p>
          </li>
        </ul>
      </div>

      <div 
        className="
          w-3/4 
          h-full

          p-4

          flex
          flex-col
          gap-4
        "
      >


        <div
          className="
            flex

            gap-4
          "
        >
          <Button>
            Replay Song
          </Button>

          <Button>
            Skip
          </Button>
        </div>
        

        <div
          className="
            w-full
            h-full

            bg-red-300

            grid
            gap-4
            grid-cols-5 
            2xl:grid-cols-6
          "
        >
          {Array(16).fill(0).map((_, i) => {
            return (
              <div
                className="
                  bg-blue-300
                "
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
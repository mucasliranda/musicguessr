import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "src/shared/components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose, DialogTitle, DialogFooter } from "src/shared/components/Dialog";
import { useToast } from "src/shared/components/Toast/use-toast";
import { useGameStore } from "src/shared/store/client/game";



export default function GameConfigDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const emitGameConfig = useGameStore((state) => state.emitGameConfig)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="h-fit"
        >
          <Settings />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Configuration</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <form
          className="
            flex
            flex-col
            gap-4
          "

          onSubmit={async (e) => {
            e.preventDefault();
          
            const formData = new FormData(e.currentTarget);
            const speed = formData.get('speed') as string;
            const duration = formData.get('duration') as string;

            setIsLoading(true);
            emitGameConfig({ speed, duration });
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsLoading(false);
            setIsOpen(false);
            toast({
              title: 'Game configuration saved'
            })
          }}
        >
          <div
            className="
              flex
              justify-between
            "
          >
            <p>Speed</p>

            <div
              className="
                flex
                border
                rounded-lg
              "
            >
              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  has-[:checked]:rounded-s-lg
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="speed"
                  value="20000"
                  className="hidden"
                />
                Slow
              </label>


              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="speed"
                  value="12000"
                  className="hidden"
                  defaultChecked
                />
                Normal
              </label>


              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  has-[:checked]:rounded-e-lg
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="speed"
                  value="7000"
                  className="hidden"
                />
                Fast
              </label>
            </div>
          </div>

          <div
            className="
              flex
              justify-between
            "
          >
            <p>Song Duration</p>

            <div
              className="
                flex
                border
                rounded-lg
              "
            >
              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  has-[:checked]:rounded-s-lg
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="duration"
                  value="2000"
                  className="hidden"
                />
                Short
              </label>


              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="duration"
                  value="8000"
                  className="hidden"
                  defaultChecked
                />
                Normal
              </label>


              <label
                className="
                  px-3
                  py-2
                  has-[:checked]:bg-primary
                  has-[:checked]:rounded-e-lg
                  select-none
                "
              >
                <input 
                  type="radio" 
                  name="duration"
                  value="30000"
                  className="hidden"
                />
                Long
              </label>
            </div>
          </div>

          <DialogFooter>
            {isLoading ? (
              <Button
                disabled
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </Button>
            ) : (
              <Button type="submit" >
                Save
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
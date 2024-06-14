import { Minus, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/shared/components/Button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose, DialogTitle, DialogFooter } from "src/shared/components/Dialog";
import { useGameStore } from "src/shared/store/client/game";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "src/shared/components/Form";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "src/shared/components/Radio";
import { Slider } from "src/shared/components/Slider";
import { toast } from "react-toastify";



const formSchema = z.object({
  gameMode: z.enum(['rounds', 'points']),
  rounds: z.number(),
  points: z.number(),
  roundDuration: z.number(),
  songDuration: z.number(),
})

function calculateNewValue(defaultValue: number, event: 'plus' | 'minus', gameMode: 'rounds' | 'points') {
  const increment = gameMode === 'rounds' ? 1 : 100;
  return event === 'plus' ? defaultValue + increment : defaultValue - increment;
}

export default function GameConfigDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emitGameConfig = useGameStore((state) => state.emitGameConfig)
  const gameShouldEndOn = useGameStore((state) => state.gameShouldEndOn)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameMode: gameShouldEndOn.type as 'rounds' | 'points',
      rounds: gameShouldEndOn.type === 'rounds' ? gameShouldEndOn.value : 15,
      points: gameShouldEndOn.type === 'points' ? gameShouldEndOn.value : 1000,
      roundDuration: 12000,
      songDuration: 3000,
    },
  });

  const watchGameMode = form.watch('gameMode');

  function handleGameModeValueChange(event: 'plus' | 'minus') {
    const currentGameMode = form.getValues('gameMode');
    form.setValue(currentGameMode, calculateNewValue(form.getValues(currentGameMode), event, currentGameMode));
  };

  async function onSubmit({ gameMode, rounds, points, roundDuration, songDuration }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    emitGameConfig({
      gameMode,
      value: gameMode === 'rounds' ? rounds : points,
      roundDuration,
      songDuration,
    });
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsOpen(false);
    toast.success('Game configuration saved');
  };

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

        <Form {...form}>
          <form
            className="
              flex
              flex-col
              gap-4
            "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="gameMode"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={onChange}
                      defaultValue={value}
                      className="
                        flex
                        gap-4
                        justify-center
                      "
                    >
                      <FormItem>
                        <FormLabel
                          className="
                            text-lg
                            select-none
                            font-normal
                            cursor-pointer
                            underline-offset-2
                            has-[:checked]:underline
                          "
                        >
                          Rounds
                          <FormControl>
                            <RadioGroupItem 
                              value="rounds"
                              className="hidden"
                              defaultChecked={form.getValues('gameMode') === 'rounds'}
                            />
                          </FormControl>
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel
                          className="
                            text-lg
                            select-none
                            font-normal
                            cursor-pointer
                            underline-offset-2
                            has-[:checked]:underline
                          "
                        >
                          Points
                          <FormControl>
                            <RadioGroupItem 
                              value="points"
                              className="hidden"
                              defaultChecked={form.getValues('gameMode') === 'points'}
                            />
                          </FormControl>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {watchGameMode === 'rounds' && (
              <FormField
                control={form.control}
                name="rounds"
                render={({ field: { onChange, value, ref } }) => (
                  <FormItem
                    className="
                      flex
                      justify-between
                    "
                  >
                    <FormLabel
                      className="
                        select-none
                        h-fit
                      "
                    >Max number of rounds: </FormLabel>
                    <FormControl>
                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          gap-2
                          !m-0
                        "
                      >
                        <button
                          type='button'
                          onClick={() => handleGameModeValueChange('minus')}
                          className="
                            rounded-full
                            bg-primary
                            p-1
                          "
                        >
                          <Minus
                            size={18}
                          />
                        </button>

                        <input
                          type="number"
                          value={value}
                          onChange={onChange}
                          onClick={(event) => {
                            event.currentTarget.focus();
                            event.currentTarget.select();
                          }}
                          ref={ref}
                          
                          className="
                            w-12
                            text-center
                            bg-transparent
                            text-white
                            rounded-lg
                            p-1
                          "
                        />

                        <button
                          type='button'
                          onClick={() => handleGameModeValueChange('plus')}
                          className="
                            rounded-full
                            bg-primary
                            p-1
                          "
                        >
                          <Plus
                            size={18}
                          />
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {watchGameMode === 'points' && (
              <FormField
                control={form.control}
                name="points"
                render={({ field: { onChange, value, ref } }) => (
                  <FormItem
                    className="
                      flex
                      justify-between
                    "
                  >
                    <FormLabel
                      className="
                        select-none
                        h-fit
                      "
                    >Max number of points: </FormLabel>
                    <FormControl>
                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          gap-2
                          !m-0
                        "
                      >
                        <button
                          type='button'
                          onClick={() => handleGameModeValueChange('minus')}
                          className="
                            rounded-full
                            bg-primary
                            p-1
                          "
                        >
                          <Minus
                            size={18}
                          />
                        </button>

                        <input
                          type="number"
                          value={value}
                          onChange={onChange}
                          onClick={(event) => {
                            event.currentTarget.focus();
                            event.currentTarget.select();
                          }}
                          ref={ref}
                          className="
                            w-12
                            text-center
                            bg-transparent
                            text-white
                            rounded-lg
                            p-1
                          "
                        />

                        <button
                          type='button'
                          onClick={() => handleGameModeValueChange('plus')}
                          className="
                            rounded-full
                            bg-primary
                            p-1
                          "
                        >
                          <Plus
                            size={18}
                          />
                        </button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="roundDuration"
              render={({ field: { onChange, value } }) => (
                <div
                  className="
                    flex
                    flex-col
                  "
                >
                  <FormItem
                    className="
                      justify-between
                      gap-2
                      flex
                    "
                  >
                    <FormLabel
                      className="
                        select-none
                        text-nowrap
                        h-fit
                      "
                    >Round Duration: </FormLabel>
                    <FormControl>
                      <Slider
                        min={7000}
                        max={20000}
                        step={1000}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        className="!m-0"
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription
                    className="
                      self-end
                    "
                  >{value / 1000} secs</FormDescription>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="songDuration"
              render={({ field: { onChange, value } }) => (
                <div
                  className="
                    flex
                    flex-col
                  "
                >
                  <FormItem
                    className="
                      justify-between
                      gap-2
                      flex
                    "
                  >
                    <FormLabel
                      className="
                        select-none
                        text-nowrap
                        h-fit
                      "
                    >Song Duration: </FormLabel>
                    <FormControl>
                      <Slider
                        min={1000}
                        max={30000}
                        step={500}
                        value={[value]}
                        onValueChange={(newValue) => onChange(newValue[0])}
                        className="!m-0"
                      />
                    </FormControl>
                  </FormItem>
                  <FormDescription
                    className="
                      self-end
                    "
                  >{value / 1000} secs</FormDescription>
                </div>
              )}
            />

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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
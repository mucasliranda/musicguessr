import { toast } from "react-toastify";
import { Button } from "src/shared/components/Button";



export default function Lobby() {
  
  async function copyInviteLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Invite link copied to clipboard!');
    }
    catch (err) {
      console.error(err);
      toast.error('Failed to copy invite link to clipboard.');
    }
  }

  return (
    <main
      className="
        w-3/4 
        h-full

        flex
        flex-col
        justify-items-start

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

          mt-24
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

        <Button
          onClick={copyInviteLink}
        >
          Copy Invite Link
        </Button>
      </div>
    </main>
  )
}
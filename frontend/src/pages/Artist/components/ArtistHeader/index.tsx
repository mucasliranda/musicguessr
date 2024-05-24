import { Button } from "src/shared/components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";



export default function ArtistHeader() {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  async function onCreateGame() {
    const gameId = window.crypto.randomUUID();
    const albums = {}

    searchParams.getAll('album').forEach((album) => {
      albums[album] = [];
    });

    for (const [key, value] of searchParams.entries()) {
      if (key !== 'album') {
        albums[key].push(value);
      }
    }

    console.log({gameId, albums})
      
    await fetch('http://localhost:3005/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: gameId,
        albums: albums,
      }),
    });

    navigate(`/game/${gameId}`);
  }

  return (
    <div className="w-full flex">
      <Button className="ml-auto" onClick={onCreateGame}>
        Create Game
      </Button>
    </div>
  )
}
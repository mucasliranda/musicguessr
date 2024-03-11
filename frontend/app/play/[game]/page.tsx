
export default function PlayPage({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { game } = params as { [key: string]: string };
  const { artist, round } = searchParams as { [key: string]: string };

  console.log({ game, artist, round })

  function onGameInit() {
    console.log('initin game')
    
  }

  return (
    <div className="pt-4">
      <button>iniciar</button>
      <h1>Play</h1>
    </div>
  )
}
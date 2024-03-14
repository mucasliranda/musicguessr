'use client'

import Player from '@/shared/components/Player';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

interface Track {
  url: string;
  startAt: number;
}

export default function PlayPage({ params }: { params: { slug: string }}) {
  const { game } = params as { [key: string]: string };
  const searchParams = useSearchParams();

  const artist = searchParams.get('artist') || '';
  const round = searchParams.get('round') || '';

  const [track, setTrack] = useState<Track | null>(null)

  async function onGameInit() {
    console.log('initin game')
    console.log({ game, artist })
    await fetch(`http://localhost:3005/game/start`, {
      body: JSON.stringify({ gameId: game, artistId: artist }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function updateRound(nextRound: number) {
    // preciso trocar o round no searchParams
    const params = new URLSearchParams(searchParams.toString())
    params.set('round', nextRound.toString())
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  async function onNextRound() {
    console.log('next round')

    const nextRound = round ? parseInt(round) + 1 : 1

    // preciso enviar o gameId e o round no query params
    const _fetch = await fetch(`http://localhost:3005/game/track?gameId=${game}&round=${nextRound}`, {
      method: 'GET',
    })

    const { startAt, track } = await _fetch.json()

    console.log({ startAt, track })

    setTrack({ url: track, startAt })

    updateRound(nextRound)
  }

  return (
    <div className="pt-4">
      <button onClick={onGameInit}>iniciar</button>
      <button onClick={onNextRound}>prox round</button>
      <h1>Play</h1>
      {!!track &&
        <Player
          startAt={track.startAt}
          src={track.url}
          controls
        /> 
      }
    </div>
  )
}
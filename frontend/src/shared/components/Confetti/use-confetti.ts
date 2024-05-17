"use client"

import { useState } from "react"

export function useConfetti() {
  const [confetti, setConfetti] = useState(false)

  function toggleConfetti() {
    console.log('trocando o confetti')
    setConfetti(!confetti)
  }

  return {
    confetti,
    toggleConfetti,
  }
}


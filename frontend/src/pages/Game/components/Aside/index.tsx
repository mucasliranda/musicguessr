


interface Props {
  children: React.ReactNode
}

export default function Aside({ children }: Props) {
  const isGameStarted = false

  return (
    <aside
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
        {isGameStarted ? 'Score' : 'Lobby'}
      </h3>
      {children}
    </aside>
  )
}
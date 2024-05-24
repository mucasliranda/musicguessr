


interface Props {
  children: React.ReactNode;
}

export default function GameLayout({ children }: Props) {
  
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      <div className="w-full max-w-screen-2xl h-screen flex">
        {children}
      </div>
    </div>
  )
}
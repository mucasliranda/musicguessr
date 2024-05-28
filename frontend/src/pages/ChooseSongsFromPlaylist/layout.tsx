


interface Props {
  children: React.ReactNode;
}

export default function ChooseSongsFromPlaylistLayout({ children }: Props) {
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      {children}
    </main>
  )
}
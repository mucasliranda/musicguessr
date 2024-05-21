import Navbar from "components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function ArtistLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar />
      {children}
    </main>
  )
}
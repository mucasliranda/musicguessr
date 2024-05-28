import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar />
      <div className="pt-4">
        {children}
      </div>
    </main>
  )
}
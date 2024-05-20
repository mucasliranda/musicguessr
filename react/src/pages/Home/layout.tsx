import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar />
      <div className="pt-4">
        <ul className="grid gap-8 grid-cols-5 2xl:grid-cols-6">
          {children}
        </ul>
      </div>
    </main>
  )
}
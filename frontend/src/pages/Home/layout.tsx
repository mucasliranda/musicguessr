import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar />
      <div className="pt-4 flex flex-col gap-4 max-w-screen-2xl">
        {children}
      </div>
    </main>
  )
}
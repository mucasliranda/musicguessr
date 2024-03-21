import Navbar from "@/app/(pregame)/(choose artist)/search/components/Navbar";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
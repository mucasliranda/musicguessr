import Navbar from "@/app/search/components/Navbar";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar/>
      {children}
    </main>
  )
}
'use client'



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full flex-col items-center bg-background">
      {children}
    </main>
  )
}

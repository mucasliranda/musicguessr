import { GameProvider } from '@/providers/game';
import { CookiesProvider } from 'next-client-cookies/server';



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <GameProvider>
        <div className="flex min-h-screen flex-col items-center bg-background">
          {children}
        </div>
      </GameProvider>
    </CookiesProvider>
  )
}
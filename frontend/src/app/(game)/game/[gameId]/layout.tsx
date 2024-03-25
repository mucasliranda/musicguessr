import { LinearTimerProvider } from "@/providers/linearTimer";
import { PlayerProvider } from "@/providers/player";
import { SocketProvider } from "@/providers/socket";
import { CookiesProvider } from 'next-client-cookies/server';



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <LinearTimerProvider>
        <PlayerProvider>
      <SocketProvider>
            <div className="flex min-h-screen flex-col items-center bg-background">
              {children}
            </div>
      </SocketProvider>
        </PlayerProvider>
          </LinearTimerProvider>
    </CookiesProvider>
  )
}
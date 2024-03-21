import { SocketProvider } from "@/providers/socket";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <div className="flex min-h-screen flex-col items-center bg-background">
        {children}
      </div>
    </SocketProvider>
  );
}
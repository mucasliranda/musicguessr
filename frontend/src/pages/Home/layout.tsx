import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-background">
      <Navbar />
      <div 
        className="
          pt-4 
          flex 
          flex-col 
          gap-4 
          lg:max-w-screen-lg
          2xl:max-w-screen-xl
        "
      >
        {children}
      </div>
    </main>
  )
}
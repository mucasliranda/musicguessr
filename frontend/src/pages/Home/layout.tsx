import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <main 
      className="
        flex 
        min-h-screen 
        flex-col 
        items-center 
        bg-background
        p-2
        lg:p-4 
      "
    >
      <Navbar />
      <div 
        className="
          pt-4 
          flex 
          flex-col 
          gap-4
          w-full
          md:max-w-[calc(100%-2rem)]
          lg:max-w-[calc(100%-12rem)]
          2xl:max-w-screen-xl
        "
      >
        {children}
      </div>
    </main>
  )
}
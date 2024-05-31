import Navbar from "../../shared/components/Navbar";



interface Props {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Props) {
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
          flex
          flex-col

          w-full
          max-w-screen-2xl
          pt-4

          gap-4
        "
      >
        {children}
      </div>
    </main>
  )
}
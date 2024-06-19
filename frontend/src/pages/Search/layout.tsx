


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
      {children}
    </main>
  )
}
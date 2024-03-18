interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, onClick, ...props }: Props) {

  return (
    <button
      className="
        py-2
        px-6 
        rounded-md 
        
        text-sm
        text-white 
        bg-primary 
        
        hover:bg-[#1ed760]
        active:scale-95
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
}
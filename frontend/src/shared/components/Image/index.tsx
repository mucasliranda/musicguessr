import { cn } from "src/shared/utils";



interface Props extends React.ImgHTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

export function Image({ src, alt, className, ...props }: Props) {
  return (
    <div
      className={cn(
        `w-full 
        h-[200px] 
        rounded-ss-lg 
        rounded-se-lg 
        overflow-hidden 
        group/image`,
        className
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="
          object-cover 
          w-full 
          h-full 
          
          grayscale-50
          group-hover:scale-110
          group-hover:grayscale-0
          
          transition 
          duration-500 
          ease-in-out 
          transform
        "
        loading="lazy"
      />
    </div>
  )
}
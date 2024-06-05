import { cn } from "src/shared/utils";
import { Blurhash } from "react-blurhash"; // Import the Blurhash component



interface Props extends Pick<React.ImgHTMLAttributes<HTMLDivElement>, 'className'> {
  src: string;
  blurHash: string;
  alt: string;
  grayscaleEffect?: boolean;
  hoverscaleEffect?: boolean;
}

export function Image({ src, blurHash, alt, className, grayscaleEffect = true, hoverscaleEffect = true }: Props) {
  return (
    <div
      className={cn(
        `w-full 
        h-[160px] 
        rounded-ss-lg 
        rounded-se-lg 
        overflow-hidden 
        group/image`,
        className
      )}
    >
      <Blurhash
        hash={blurHash}
        width="100%"
        height="100%"
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
      <img
        src={src}
        alt={alt}
        className={cn(`
          w-full 
          h-full
          
          transition 
          duration-500 
          ease-in-out 
          transform
          object-contain
          sm:object-cover`,
          grayscaleEffect && "grayscale-50 group-hover:grayscale-0",
          hoverscaleEffect && "group-hover:scale-110"
        )}
        loading="lazy"
        onLoad={(e) => {
          e.currentTarget.previousElementSibling?.classList.add("!hidden")
        }}
      />
    </div>
  )
}
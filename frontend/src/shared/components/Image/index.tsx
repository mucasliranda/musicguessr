


interface Props {
  src: string;
  alt: string;
  size?: number;
}

export function Image({ src, alt, size = 200 }: Props) {
  return (
   <div className={`w-full h-[${size}px] rounded-ss-lg rounded-se-lg overflow-hidden group/image`}>
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
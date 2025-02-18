import Image from "next/image";

interface Props {
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  height: number;
  src?: string;
  width: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProductImage = ({ alt, height, width, className, src, onMouseEnter, onMouseLeave }: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : `/imgs/placeholder.jpg`

  return (
    <div>
      <Image
        src={localSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}

        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  )
}
export default ProductImage
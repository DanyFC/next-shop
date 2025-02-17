import Image from "next/image";

interface Props {
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  height: number;
  src?: string;
  width: number;
}

const ProductImage = ({ alt, height, width, className, src }: Props) => {
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
      />
    </div>
  )
}
export default ProductImage
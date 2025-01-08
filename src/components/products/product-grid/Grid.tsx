import { Product } from "@/interfaces";
import GridItem from "./GridItem";

interface Props {
  products: Product[];
}

const Grid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {
        products.map((product) => (<GridItem key={product.slug} product={product} />))
      }
    </div>
  )
}
export default Grid
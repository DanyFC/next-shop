import { Grid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products

export default function ShopPage() {
  return (
    <div>
      <Title
        className="mb-2"
        subtitle="All the products"
        title="Shop"
      />
      <Grid products={products} />
    </div>
  );
}
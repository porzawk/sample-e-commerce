import React from "react";
import ProductCard from "./ProductCard";

type Props = {
  params: {
    category: string;
  };
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type Rating = {
  rate: number;
  count: number;
};

const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_API_URL}/products`, {
    next: { revalidate: 30 },
  });
  const product: Product[] = await res.json();
  return product;
};

const Products = async ({ params: { category } }: Props) => {
  const product = await fetchProducts();
  return (
    <div className="flex flex-wrap gap-5">
      {product.map((item, index) => (
        <ProductCard
          key={index}
          id={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          posterPath={item.image}
          rating={item.rating}
        />
      ))}
    </div>
  );
};

export default Products;

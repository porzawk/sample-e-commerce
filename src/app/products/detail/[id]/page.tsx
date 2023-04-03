import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Image from "next/image";
import ScoreRating from "../../ScoreRating";
import ActionButton from "./ActionButton";
import ProductCard from "../../ProductCard";

dayjs.extend(duration);

type Props = {
  params: {
    id: string;
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

const fetchProductDetail = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  const detail: Product = await res.json();
  return detail;
};

const fetchProducts = async (category: string | number) => {
  const res = await fetch(
    `${process.env.NEXT_API_URL}/products/category/${category}`,
    {
      next: { revalidate: 30 },
    }
  );
  const product: Product[] = await res.json();
  return product;
};

const Detail = async ({ params: { id } }: Props) => {
  const productDetail = await fetchProductDetail(id);
  const product = await fetchProducts(productDetail.category);
  const filterProduct = product.filter((item) => item.id !== parseInt(id));
  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg mt-4">
        <p className="text-lg font-bold text-black">{productDetail.title}</p>
        <div className="flex">
          <ScoreRating rating={productDetail.rating.rate} />
          <span className="whitespace-nowrap truncate text-gray-500 text-lg ml-2">
            {productDetail.rating.count} reviews
          </span>
        </div>
        <div className="flex">
          <span className="whitespace-nowrap truncate text-gray-500 text-lg">
            {productDetail.category}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="flex justify-center bg-white h-100 object-contain">
            <Image
              src={productDetail.image}
              alt={productDetail.title}
              className="rounded-t-lg"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="col-span-3">
            <p className="whitespace-nowrap truncate text-[#4CAF50] text-xl">
              ฿{productDetail.price}
            </p>
            <p className=" text-blue-500">In stock</p>
            <p>{productDetail.description}</p>
            <ActionButton
              id={productDetail.id}
              title={productDetail.title}
              image={productDetail.image}
              price={productDetail.price}
              qty={1}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg mt-4">
        <span className=" text-xl font-bold">You may also like:</span>
        <div className="flex flex-wrap gap-5 mt-2">
          {filterProduct.map((item, index) => (
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
      </div>
    </div>
  );
};

export default Detail;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScoreRating from "./ScoreRating";

type Props = {
  id: number;
  title: string;
  description: string;
  price: number;
  posterPath: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductCard = ({
  id,
  title,
  description,
  price,
  posterPath,
  rating,
}: Props) => {
  return (
    <div className="max-w-sm w-64 bg-white border border-gray-200 rounded-lg shadow  transition-transform hover:scale-105">
      <Link href={`/products/detail/${id}`}>
        <div className="flex flex-col justify-between h-full pb-2">
          <div className="flex flex-col">
            <div className="flex justify-center bg-white h-40 object-contain">
              <Image
                src={posterPath}
                alt={title}
                className="rounded-t-lg"
                width={80}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="p-2">
              <span className="text-base text-left whitespace-normal font-bold tracking-tight text-black">
                {title}
              </span>
              <p className="whitespace-nowrap truncate text-black">
                {description}
              </p>
            </div>
          </div>

          <div className="flex justify-between px-2">
            <span className="whitespace-nowrap truncate text-[#4CAF50] text-lg">
              ฿{price}
            </span>
            <ScoreRating rating={rating.rate} count={rating.count} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

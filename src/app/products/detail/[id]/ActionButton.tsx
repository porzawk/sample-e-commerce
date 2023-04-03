"use client";
import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/cart";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
};

const ActionButton = ({ id, title, image, price, qty }: Product) => {
  const dispatch = useAppDispatch();

  const handleAddToCartClick = ({ id, title, image, price, qty }: Product) => {
    dispatch(addToCart({ id, title, image, price, qty }));
    toast.success("Added to cart", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="flex gap-2 mt-5">
      <button
        type="button"
        className="text-white bg-[#0A8FDC] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        onClick={() => handleAddToCartClick({ id, title, image, price, qty })}
      >
        Add To Cart
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-[#F04F47] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Buy Now
      </button>
    </div>
  );
};

export default ActionButton;

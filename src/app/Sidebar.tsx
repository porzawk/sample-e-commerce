"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { cartSelector } from "@/redux/slices/cart";
import Link from "next/link";
import React, { ReactNode } from "react";
import { categories } from "../constants";
import { IconContext } from "react-icons";

type MenuItemProps = {
  index: number;
  id: string | number;
  title: string;
  icon: ReactNode;
};

const MenuItem = ({ index, id, title, icon }: MenuItemProps) => {
  const cart = useSelector(cartSelector);
  return (
    <li key={index}>
      <Link
        href={`/${id}`}
        className="flex items-center justify-between p-2 px-3 text-base font-normal text-[#4C4C4C] rounded-lg hover:bg-[#F5F5F5]"
      >
        <div className="flex">
          {icon}
          <span className="ml-3">{title}</span>
        </div>

        {title === "Cart" && cart.cartItems.length > 0 && (
          <span className=" bg-red-500 text-white text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
            {cart.cartItems.length}
          </span>
        )}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-56 h-screen  transition-transform -translate-x-full lg:translate-x-0 border-0 border-r border-solid border-[#E0E0E0]">
      <div className="h-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-[#363636] scrollbar-track-[#1f1f1f]">
        <IconContext.Provider value={{ size: "24px" }}>
          <div className="flex justify-center py-5">
            <Image
              src="/logo.png"
              alt="Picture of the author"
              width={30}
              height={30}
            />
            <span className="text-black px-2 font-bold text-lg">
              Shopping Store
            </span>
          </div>
          <hr className="h-px mb-2 bg-gray-200 border-0 "></hr>
          <ul className="space-y-1">
            <p className="text-gray-500 ml-3">Categories</p>
            {categories.map((item, index) => (
              <MenuItem key={index} index={index} {...item} />
            ))}
          </ul>
        </IconContext.Provider>
      </div>
    </aside>
  );
};

export default Sidebar;

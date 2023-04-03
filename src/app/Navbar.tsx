"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsSun, BsMoonFill, BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const ThemeToggleButton = () => {
  const [mode, setMode] = useState("dark");
  return (
    <button
      type="button"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="text-blue-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
    >
      {mode === "dark" ? <BsSun size={20} /> : <BsMoonFill size={20} />}
    </button>
  );
};

const SearchBox = () => {
  return (
    <form>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <BsSearch />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  placeholder-gray-400 "
          placeholder="Search..."
          required
        />
      </div>
    </form>
  );
};

const Account = () => {
  return (
    <Link href={`/account`}>
      <div className="flex gap-2 py-2 px-3 items-center rounded-lg  hover:bg-[#F5F5F5]">
        <h6>Account</h6>
        <FaUserCircle size={20} />
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed flex justify-between items-center w-full h-12 z-20 pl-56 bg-white border-0 border-b border-solid border-[#E0E0E0]">
      <div className="ml-2">
        <ThemeToggleButton />
      </div>
      <div>
        <SearchBox />
      </div>
      <div className="mr-2">
        <Account />
      </div>
    </nav>
  );
};

export default Navbar;

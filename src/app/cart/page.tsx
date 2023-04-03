"use client";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearAllCart,
} from "@/redux/slices/cart";
import { useSelector } from "react-redux";
import { cartSelector } from "@/redux/slices/cart";

const Cart = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const cart = useSelector(cartSelector);
  const [orderSummary, setOrderSummary] = useState({
    grandTotal: 0,
    Discount: 0,
    ShippingCharge: 0,
    OrderTotal: 0,
  });

  useEffect(() => {
    let grandTotal = 0;
    let discount = cart.cartItems.length > 0 ? 100 : 0;
    let shippingCharge = cart.cartItems.length > 0 ? 40 : 0;
    cart.cartItems.map((item) => {
      grandTotal += item.qty * item.price;
    });
    let orderTotal = grandTotal - discount + shippingCharge;
    if (orderTotal < 0) {
      orderTotal = 0;
    }
    setOrderSummary({
      grandTotal: grandTotal,
      Discount: discount,
      ShippingCharge: shippingCharge,
      OrderTotal: orderTotal,
    });
  }, [cart]);

  const handleIncreaseQtyClick = (id: number) => {
    dispatch(increaseQty(id));
  };
  const handleDecreaseQtyClick = (id: number) => {
    dispatch(decreaseQty(id));
  };
  const handleRemoveFromCartClick = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <span className="text-2xl font-bold text-black">Cart</span>
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="col-span-3">
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-base text-gray-700 bg-[#F4F7FE]">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[600px]">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3" align="center">
                    QTY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="rounded-full w-8 h-8"
                          src={item.image}
                          alt={item.title}
                        />
                        <span>{item.title}</span>
                      </div>
                    </th>
                    <td className="px-6 py-2">฿{item.price}</td>
                    <td className="px-6 py-2">
                      <div className="flex items-center justify-between gap-4 border border-black rounded-2xl py-2 px-2 text-black">
                        <AiOutlinePlus
                          className="cursor-pointer"
                          size={20}
                          onClick={() => handleIncreaseQtyClick(item.id)}
                        />
                        {item.qty}
                        <AiOutlineMinus
                          className="cursor-pointer"
                          size={20}
                          onClick={() => handleDecreaseQtyClick(item.id)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-2">฿{item.price * item.qty}</td>
                    <td className="px-6 py-2">
                      <AiFillCloseCircle
                        size={20}
                        className="text-black cursor-pointer"
                        onClick={() => handleRemoveFromCartClick(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-5 justify-between">
              <button
                type="button"
                className="text-white bg-[#0A8FDC] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                onClick={() => push("/products")}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-[#F04F47] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                onClick={() => dispatch(clearAllCart())}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg mt-4 flex flex-col">
            <span className="text-base font-bold text-black">
              Order Summary
            </span>
            <div className="flex justify-between py-1">
              <span>Grand Total:</span>
              <span>฿{orderSummary.grandTotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount:</span>
              <span>฿{orderSummary.Discount}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping Charge:</span>
              <span>฿{orderSummary.ShippingCharge}</span>
            </div>
            <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
            <div className="flex justify-between text-lg font-bold">
              <span>Order Total:</span>
              <span>฿{orderSummary.OrderTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

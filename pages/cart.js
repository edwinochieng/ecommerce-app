import React, { useContext } from "react";
import { Store } from "../context/CartContext";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Cart() {
  const { cart, dispatch } = useContext(Store);
  const router = useRouter();

  const removeCartItem = (item) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: item,
    });
  };

  const updateCartHandler = async (item, value) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (value === "inc") {
      const quantity = item.quantity + 1;

      if (data?.countInStock < quantity) {
        return toast.error("Sorry. Product is out of stock!");
      }

      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, quantity },
      });
    } else if (value === "dec") {
      const quantity = item.quantity > 0 ? item.quantity - 1 : item.quantity;

      if (data?.countInStock < quantity) {
        return toast.error("Sorry. Product is out of stock!");
      }

      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, quantity },
      });
    }
    toast.success("Quantity updated in the cart");
  };

  return (
    <div className='max-w-[600px] mx-auto'>
      {cart.cartItems.length === 0 ? (
        <div className=' flex flex-col items-center pt-28'>
          <AiOutlineShopping size={150} />
          <h1 className='font-semibold text-xl pt-2'>
            Your shopping bag is empty
          </h1>

          <div className='pt-8'>
            <Link href='/'>
              <button className='w-56 h-9 bg-rose-500 rounded-xl font-semibold text-lg text-white'>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='w-full'>
          {cart.cartItems.map((item) => (
            <div
              key={item.slug}
              item={item}
              className='flex justify-between mb-6'
            >
              <div className='flex'>
                <div className='bg-gray-100 rounded-lg p-2'>
                  <Image
                    src={item.picture}
                    height='80'
                    width='80'
                    alt={item.name}
                  />
                </div>
                <div className='ml-4 flex flex-col justify-between'>
                  <h1 className='font-semibold text-base text-gray-900'>
                    {item.name}
                  </h1>
                  <div className='flex'>
                    <span
                      onClick={() => updateCartHandler(item, "dec")}
                      className='border p-2 rounded-lg border-rose-500 font-bold text-rose-600 cursor-pointer'
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className='mx-2 py-1 font-bold text-lg'>
                      {item.quantity}
                    </span>
                    <span
                      onClick={() => updateCartHandler(item, "inc")}
                      className='border p-2 rounded-lg bg-rose-400 text-white cursor-pointer'
                    >
                      <AiOutlinePlus />
                    </span>
                  </div>
                </div>
              </div>

              <div className='pl-14 flex flex-col justify-between'>
                <h1 className='font-bold text-gray-900 text-base'>
                  ${item.price}
                </h1>
                <span
                  onClick={() => removeCartItem(item)}
                  className='px-1 cursor-pointer'
                >
                  <HighlightOffIcon sx={{ color: "#f43f5e" }} />
                </span>
              </div>
            </div>
          ))}
          <div className='flex flex-col pt-10 z-10 max-w-[400px] mx-auto'>
            <div className='flex justify-between text-lg'>
              <h1 className='font-bold'>Subtotal:</h1>
              <h1 className='font-bold'>
                ${cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </h1>
            </div>
            <div className='py-2'>
              <button
                onClick={() => router.push("login?redirect=/shipping")}
                className='w-full py-2 rounded-lg bg-rose-600 font-bold text-white text-center'
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

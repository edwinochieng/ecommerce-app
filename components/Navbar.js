import React, { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { Store } from "../context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BasicMenu from "./Dashboad";
import { CircularProgress } from "@mui/material";

function Navbar() {
  const { status, data: session } = useSession();
  const { cart } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-transparent mt-6 sm:mt-8 lg:mt-10'>
      <div className='flex justify-between px-8 sm:px-20 lg:px-32'>
        <div className='cursor-pointer text-gray-700'>
          <Link href='/'>
            <HiHome size={28} />
          </Link>
        </div>

        <div className='flex items-start'>
          <div className='px-6 text-lg'>
            {status === "loading" ? (
              <CircularProgress size={28} sx={{ color: "#f43f5e" }} />
            ) : session?.user ? (
              <BasicMenu />
            ) : (
              <Link href='/login'>
                <a className='font-medium text-[18px]'>Login</a>
              </Link>
            )}
          </div>

          <Link href='/cart'>
            <a className='flex'>
              <span className='text-gray-700 font-bold'>
                <GiShoppingCart size={28} />
              </span>
              {cartItemsCount > 0 && (
                <sup className='rounded-full bg-red-400 h-5 w-5 py-0.5 px-1 text-center font-bold text-xs text-white'>
                  {cartItemsCount}
                </sup>
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

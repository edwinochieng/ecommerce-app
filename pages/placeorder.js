import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useContext } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { Store } from "../context/CartContext";
import { getError } from "../utils/getError";

export default function PlaceOrderScreen() {
  const { cart, dispatch } = useContext(Store);
  const { cartItems, shippingAddress } = cart;
  const router = useRouter();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        shippingAddress,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CLEAR_CART_ITEMS" });
      Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
      router.push("/order/${data._id}");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <h1 className='text-[24px]'>Place Order</h1>

      {cartItems.length === 0 ? (
        <div className=' flex flex-col items-center pt-28'>
          <AiOutlineShopping size={150} />
          <h1 className='font-semibold text-xl pt-2'>
            Your shopping bag is empty
          </h1>

          <div className='pt-8'>
            <Link href='/'>
              <button className='w-56 h-9 bg-rose-500 rounded-2xl font-semibold text-lg text-white'>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 gap-5'>
          <div className='w-full'>
            <div className=' rounded-md shadow-2xl mt-3 p-3'>
              <h1 className='font-semibold'>Shipping Address</h1>
              <div className='py-2 text-[18px]'>
                {shippingAddress.fullName},{shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country}
              </div>
              <h2 className='text-sky-500'>
                <Link href='/shipping'>Edit</Link>
              </h2>
            </div>
            <div className=' rounded-md shadow-2xl mt-3 p-3'>
              <h1 className='text-lg'>Order Items</h1>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='text-left'>Item</th>
                    <th className='text-right'>Quantity</th>
                    <th className='text-right'>Price</th>
                    <th className='text-right'>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className='border-b'>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className='flex items-center'>
                            <Image
                              src={item.picture}
                              height='50'
                              width='50'
                              alt='product'
                            />
                            &nbsp;{item.name}
                          </a>
                        </Link>
                      </td>
                      <td className='text-right'>{item.quantity}</td>
                      <td className='text-right'>{item.price}</td>
                      <td className='text-right'>
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='text-sky-500'>
                <Link href='/cart'>Edit</Link>
              </div>
            </div>
          </div>
          <div className='max-w-sm w-full rounded-2xl shadow-xl p-4'>
            <h1>Order Summary</h1>
            <ul>
              <li className='flex justify-between'>
                <div>Items</div>
                <div>${itemsPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Tax</div>
                <div>${taxPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Shipping</div>
                <div>${shippingPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Total Price</div>
                <div>${totalPrice}</div>
              </li>
              <li>
                <button className='w-full py-2 bg-rose-500 rounded-md'>
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

PlaceOrderScreen.auth = true;

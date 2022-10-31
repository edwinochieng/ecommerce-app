import Router, { useRouter } from "next/router";
import React, { useContext } from "react";
import Image from "next/image";
import { Store } from "../../context/CartContext";
import Product from "../../models/Product";
import { convertDocToObj } from "../../utils/db";
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails({ product }) {
  const { cart, dispatch } = useContext(Store);
  const { query } = useRouter();

  if (!product) {
    return (
      <div className='h-[50vh] flex justify-center items-center'>
        <h1 className='fonr-bold text-3xl'>Product not found</h1>
      </div>
    );
  }
  const addToCart = async () => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data?.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock!");
    }

    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    });
    Router.push("/cart");
  };
  return (
    <div className='min-h-screen pt-24 md:pt-28 px-5 lg:px-56 grid md:grid-cols-2 gap-1 lg:gap-12'>
      <div className='bg-gray-100 rounded-2xl mx-4 px-4 lg:px-20 py-8 lg:py-10 h-[22rem] lg:h-[30rem]'>
        <Image
          src={product?.picture}
          height='400'
          width='400'
          alt={product?.name}
        />
      </div>
      <div className='px-4'>
        <div>
          <h1 className='font-bold text-xl md:text-3xl'>{product?.name}</h1>
        </div>
        <div className='pt-2 lg:pt-4'>
          <h1 className='font-semibold text-base md:text-lg'>Description:</h1>
          <p className='pt-1 font-medium text-sm text-gray-400'>
            {product?.description}
          </p>
        </div>
        <div className='pt-2 lg:pt-8'>
          <h1 className='font-extrabold text-2xl text-rose-500'>
            ${product?.price}
          </h1>
        </div>
        <div className='pt-2 lg:pt-4'>
          {product?.countInStock > 0 ? (
            <button
              onClick={addToCart}
              className='w-32 sm:w-36 lg:w-48 h-9 sm:h-10 lg:h-12 rounded-xl shadow-lg bg-rose-400 text-white text-sm sm:text-base text-center font-bold hover:bg-white hover:text-rose-300 hover:shadow-2xl'
            >
              Add to cart
            </button>
          ) : (
            <button className='w-32 sm:w-36 lg:w-48 h-9 sm:h-10 lg:h-12 rounded-xl shadow-2xl bg-rose-100 text-rose-400 text-base sm:text-lg text-center font-bold hover:shadow-2xl'>
              Out of stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const product = await Product.findOne({ slug }).lean();

  return {
    props: {
      product: product ? convertDocToObj(product) : null,
    },
  };
}

export default ProductDetails;

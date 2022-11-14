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
    <div className='flex flex-col sm:flex-row justify-center gap-1 lg:gap-5'>
      <div className='bg-gray-100 w-[360px] sm:w-[480px] max-h-[480px] p-8 sm:p-20 rounded-xl mx-2'>
        <Image
          src={product?.picture}
          height='300'
          width='300'
          alt={product?.name}
        />
      </div>
      <div className='px-2 sm:px-4'>
        <div>
          <h1 className='font-bold text-xl md:text-3xl'>{product?.name}</h1>
        </div>
        <div className='pt-2 lg:pt-4'>
          <h1 className='font-semibold text-base md:text-lg'>Description:</h1>
          <p className='sm:max-w-[400px] pt-1 font-medium text-[14px] text-gray-400'>
            {product?.description}
          </p>
        </div>
        <div className='pt-2 lg:pt-4'>
          <h1 className='font-extrabold text-2xl text-rose-500'>
            ${product?.price}
          </h1>
        </div>
        <div className='pt-2 max-w-[155px]'>
          {product?.countInStock > 0 ? (
            <button
              onClick={addToCart}
              className='w-full py-3 rounded-xl shadow-lg bg-rose-400 text-white text-sm sm:text-base text-center font-bold hover:bg-white hover:text-rose-300 hover:shadow-2xl'
            >
              Add to cart
            </button>
          ) : (
            <button className='w-full py-3 rounded-xl shadow-2xl bg-rose-100 text-rose-400 text-base sm:text-lg text-center font-bold hover:shadow-2xl'>
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

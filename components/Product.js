import React from "react";
import Image from "next/image";
import Link from "next/link";
function ProductItem({ product, addToCartHandler }) {
  return (
    <div>
      <div className='max-w-[340px] w-full mx-auto rounded-xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105'>
        <div className='bg-gray-100 flex items-center justify-center rounded-t-xl py-6'>
          <Link href={`/product/${product.slug}`}>
            <a>
              <Image
                src={product.picture}
                height='200'
                width='200'
                alt={product.name}
              />
            </a>
          </Link>
        </div>
        <div className='py-3 px-3'>
          <Link href={`/product/${product.slug}`}>
            <a>
              <h1 className='font-semibold text-[16px]'>{product.name}</h1>
            </a>
          </Link>

          <div className='flex justify-between items-center'>
            <div className='flex font-semibold text-rose-700 text-[17px]'>
              <span>$</span>
              <h1>{product.price}</h1>
            </div>

            <div>
              <button
                className='font-extrabold w-full py-[5px] px-3 rounded-xl bg-rose-500 text-white text-[10px]'
                onClick={() => addToCartHandler(product)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

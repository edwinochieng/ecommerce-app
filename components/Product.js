import React from "react";
import Image from "next/image";
import Link from "next/link";
function ProductItem({ product, addToCartHandler }) {
  return (
    <div>
      <div className='w-auto rounded-xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-110'>
        <div className='bg-gray-100 flex items-center justify-center rounded-xl py-8'>
          <Link href={`/product/${product.slug}`}>
            <a>
              <Image
                src={product.picture}
                height='200'
                width='150'
                alt={product.name}
              />
            </a>
          </Link>
        </div>
        <div className='pt-2 pb-3 px-3'>
          <Link href={`/product/${product.slug}`}>
            <a>
              <h1 className='font-bold text-sm lg:text-base'>{product.name}</h1>
            </a>
          </Link>

          <div className='flex justify-between pt-4'>
            <div className='flex font-bold text-xs sm:text-sm'>
              <span>$</span>
              <h1>{product.price}</h1>
            </div>

            <div>
              <button
                className='font-extrabold h-5 w-5 rounded-md bg-rose-600 text-white text-sm'
                onClick={() => addToCartHandler(product)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

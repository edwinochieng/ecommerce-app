import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image';
import products from '../../utils/data';


function ProductDetails() {
    const {query} = useRouter();
    const {slug} = query;
    const product = products.find(x => x.slug === slug)
     if(!product){
        return <h1>Product not found</h1>
     }
  return (
    <div className='min-h-screen pt-8 md:pt-28 px-5 md:px-36 grid md:grid-cols-2'>
    <div>
      <Image src={product?.picture} height="400" width = "400" alt ={product?.name}/>
    </div>
     <div>
        <div>
        <h1 className='font-bold text-3xl'>{product?.name}</h1>

        </div>
        <div className='pt-4'>
          <h1 className='font-semibold text-lg'>Description:</h1> 
          <p className='pt-1 font-medium text-sm text-gray-400'>{product?.description}</p> 
        </div>
        <div className='pt-8'> 
            <h1 className='font-extrabold text-2xl text-rose-500'>${product?.price}</h1>
        </div>
        <div className='pt-4'>
            <button className="w-32 sm:w-36 lg:w-48 h-8 sm:h-10 lg:h-12 rounded-xl shadow-lg bg-rose-400 text-white text-sm sm:text-base text-center font-bold hover:bg-white hover:text-rose-300 hover:shadow-2xl">Add to cart</button>
        </div>

     </div>
    </div>
  )
}

export default ProductDetails

import React from "react";
import Image from "next/image";
import Link from "next/link";

function HeroBanner() {
  return (
    <div className='bg-rose-100 min-h-[38vh] sm:min-h-[47vh] md:min-h-[53vh] lg:min-h-[74vh] max-w-screen-xl mx-auto w-full px-4 sm:px-14 lg:px-0 flex justify-center items-center rounded-3xl'>
      <div className=''>
        <div className='flex flex-col'>
          <h1 className='font-bold font-montserrat text-gray-800 text-[26px] leading-[24px] sm:text-[46px] sm:leading-[42px] lg:text-[57px] lg:leading-[53px]'>
            Unlock new <br className='hidden sm:block' />
            possibilities.
          </h1>
          <p className='pt-2 sm:pt-4 lg:pt-6 font-medium text-gray-400 text-[12px] leading-[15px] sm:text-[16px] sm:leading-[21px] lg:text-[20px] lg:leading-[25px] max-w-[380px]'>
            Get quality products from the number one online store. Delivered
            straight to your doorstep.
          </p>
        </div>

        <div className='pt-2 sm:pt-4 lg:pt-8 max-w-[114px] sm:max-w-[164px]'>
          <Link href='/product/airpods'>
            <button className='w-full py-2 sm:py-3  rounded-xl shadow-lg bg-rose-400 text-white text-sm sm:text-base text-center font-bold hover:bg-white hover:text-rose-300'>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className='ml-1 sm:ml-2 lg:ml-10'>
        <Image
          src='/products/airpods.png'
          height='350'
          width='350'
          alt='headset image'
          className=''
        />
      </div>
    </div>
  );
}

export default HeroBanner;

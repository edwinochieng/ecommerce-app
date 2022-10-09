import React from "react";
import Image from "next/image";

function HeroBanner() {
  return (
    <div className="bg-rose-100 min-h-[53vh] sm:min-h-[60vh] lg:min-h-[80vh] pt-24 sm:pt-36 lg:pt-32 px-6 sm:px-16 lg:px-64 flex justify-center gap-2 sm:gap-8 lg:gap-12">
      <div className="pt-8">
        <div className="flex flex-col sm:pt-0">
          <h1 className="font-bold font-montserrat text-gray-800 text-2xl sm:text-5xl lg:text-7xl">
            Unlock new possibilities.
          </h1>
          <p className="pt-4 sm:pt-6 lg:pt-8 font-medium text-gray-400 text-xs sm:text-lg lg:text-2xl">
            Get quality products from the number one online store. 
            Free delivery, straight to your doorstep.
          </p>
        </div>

        <div className="pt-12 sm:pt-16 lg:pt-20">
          <button className="w-32 sm:w-36 lg:w-48 h-8 sm:h-10 lg:h-12 rounded-xl shadow-lg bg-rose-400 text-white text-sm sm:text-base text-center font-bold hover:bg-white hover:text-rose-300">
            Shop Now
          </button>
        </div>
      </div>
      <div className="pt-8 lg:pt-0 pl-2 sm:pl-0">
        <Image
          src="/products/airpods.png"
          height="600"
          width="400"
          alt="headset image"
          className=""
        />
      </div>
    </div>
  );
}

export default HeroBanner;

import React from 'react'
import Image from 'next/image'

function HeroBanner() {
  return (
    <div className='bg-rose-100 min-h-[65vh] sm:min-h-[80vh] pt-32 px-10 sm:px-36 lg:px-64 flex gap-3'>
         <div className='pt-8'>
            <h1 className='font-bold font-montserrat text-gray-500 text-2xl sm:text-7xl'>Unlock new possibilities</h1>
            <p></p>
             <div className='pt-24'>
                <button className='w-48 h-10 rounded-xl bg-rose-400 text-white font-semibold'>Shop Now</button>
             </div>
         </div>
         <div>
          <Image src = "/products/airpods.png" height='400' width = '400' alt = "headset image" className=''/>
         </div>
    </div>
  )
}

export default HeroBanner
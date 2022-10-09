import React from 'react'
import {GiShoppingCart} from 'react-icons/gi'

function Navbar() {
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-transparent mt-8 sm:mt-10'>
        <div className='flex justify-between px-8 sm:px-20 lg:px-28'>
            <div>
                <h1 className='font-extrabold font-montserrat text-xl sm:text-3xl'>Amazonah</h1>
            </div>
            
            <div className='font-bold'>
                <GiShoppingCart size = {28}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
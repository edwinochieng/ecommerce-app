import React,{useContext} from 'react'
import {Store} from '../context/CartContext'
import {AiOutlineShopping,AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import Link from 'next/link';
import Image from 'next/image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Cart() {
    const {cart} = useContext(Store);

  return (
    <div className='min-h-screen pt-12 sm:pt-16 lg:pt-20 px-8 sm:px-10 lg:px-32'>
       {cart.cartItems.length === 0?
        (
         <div className=' flex flex-col items-center pt-28'>
            <AiOutlineShopping size={150}/>
            <h1 className='font-semibold text-xl pt-2'>Your shopping bag is empty</h1>

            <div className='pt-8'>
            <Link href = '/'>
            <button className='w-56 h-9 bg-rose-500 rounded-xl font-semibold text-lg text-white'>Continue Shopping</button>
            </Link>
            </div>
         </div>
        )
        :
        (
        <div>
            <div className='pt-10'>
              {cart.cartItems.map((item) => 
              (
                <div key ={item.slug} item = {item} className = "flex gap-5 py-2">
                    <div className='bg-gray-100 rounded-lg p-2'>
                    <Image src={item.picture} height="100" width = "100" alt ={item.name}/>
                    </div>
                    <div className='flex flex-col justify-between'>
                       <h1 className='font-bold text-lg text-gray-900'>{item.name}</h1>
                       <div className='flex'>
                        <span className='border p-2 rounded-lg border-rose-500'><AiOutlineMinus/></span>
                        <span className='mx-2 py-1 font-bold text-lg'>{item.quantity}</span>
                        <span className='border p-2 rounded-lg bg-rose-400'><AiOutlinePlus/></span>
                       </div>
                    </div>
                    <div className='pl-14 flex flex-col justify-between'>
                       <h1 className='font-bold text-base'>${item.price}</h1> 
                       <span className='px-1'><HighlightOffIcon sx ={{color:"#f43f5e"}}/></span>
                    </div>
                </div>
              ))}
            </div>
        </div>
        ) }
    </div>
  )
}

export default Cart
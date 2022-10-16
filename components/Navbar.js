import React, { useContext } from 'react'
import {GiShoppingCart} from 'react-icons/gi'
import { Store } from '../context/CartContext'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import BasicMenu from './Dashboad'
import { CircularProgress } from '@mui/material'

function Navbar() {
    const {status, data: session} = useSession();
    const {cart} = useContext(Store)
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(()=>{
        setCartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity, 0))
    },[cart.cartItems])
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-transparent mt-8 sm:mt-10'>
        <div className='flex justify-between px-8 sm:px-20 lg:px-28'>
            <div>
                 <Link href = '/'>
                 <h1 className='font-extrabold font-montserrat text-xl sm:text-3xl'>Amazonah</h1>
                 </Link>
                
            </div>
            
            <div className='flex'>
            <div className='px-6 text-lg'>
             {status === 'loading'? <CircularProgress /> : 
              (session?.user ? <BasicMenu/> : (
                <Link href = '/login'>
                <a>Login</a>
                </Link>))
             }
            </div>

            
            <Link href ='/cart'>
               <a className='flex'>
               <span><GiShoppingCart size = {28}/></span> 
                {cartItemsCount > 0 && 
                <sup className='rounded-full bg-red-400 h-5 w-5 py-0.5 px-1 text-center font-bold text-xs text-white'>
                {cartItemsCount}
                </sup>}
               </a> 
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
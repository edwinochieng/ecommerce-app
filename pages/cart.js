import React,{useContext} from 'react'
import {Store} from '../context/CartContext'
import {AiOutlineShopping,AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import Link from 'next/link';
import Image from 'next/image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Router } from 'next/router';
import dynamic from 'next/dynamic';

function Cart() {
    const {cart,dispatch} = useContext(Store);

    const removeCartItem = (item) => {
      dispatch({
        type : "REMOVE_CART_ITEM",
        payload : item
      })
    }

    const updateCartHandler = (item,value) => {
      if(value === 'inc'){
        const quantity = item.quantity + 1 ;
         dispatch({
          type : 'ADD_ITEM',
          payload : {...item, quantity}
        })
      } else if(value === 'dec'){
        const quantity =  item.quantity > 0 ? item.quantity - 1 : item.quantity;
         dispatch({
          type : 'ADD_ITEM',
          payload : {...item, quantity}
        })
      }
     
    }

  return (
    <div className='min-h-screen pt-12 sm:pt-16 lg:pt-20 px-8 sm:px-10 lg:px-32 relative'>
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
        
            <div className='pt-10 flex flex-col items-center'>
              {cart.cartItems.map((item) => 
              (
                <div key ={item.slug} item = {item} className = "flex gap-5 py-2">
                    <div className='bg-gray-100 rounded-lg p-2'>
                    <Image src={item.picture} height="100" width = "100" alt ={item.name}/>
                    </div>
                    <div className='flex flex-col justify-between'>
                       <h1 className='font-bold text-lg text-gray-900'>{item.name}</h1>
                       <div className='flex'>
                        <span onClick={()=> updateCartHandler(item, 'dec')} className='border p-2 rounded-lg border-rose-500'><AiOutlineMinus/></span>
                        <span className='mx-2 py-1 font-bold text-lg'>{item.quantity}</span>
                        <span onClick={()=> updateCartHandler(item, 'inc')} className='border p-2 rounded-lg bg-rose-400'><AiOutlinePlus/></span>
                       </div>
                    </div>
                    <div className='pl-14 flex flex-col justify-between'>
                       <h1 className='font-bold text-base'>${item.price}</h1> 
                       <span onClick ={()=> removeCartItem(item)} className='px-1'><HighlightOffIcon sx ={{color:"#f43f5e"}}/></span>
                    </div>
                </div>
              ))}
              <div className='absolute bottom-10 flex flex-col pt-4 z-10'>
                <div className='flex justify-between text-lg'>
                  <h1 className='font-bold'>Subtotal:</h1>
                  <h1 className='font-bold'>${cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}</h1>
                </div>
                <div className='py-6'>
                   <button onClick={()=> Router.push('login?redirect=/shipping')} className ="h-9 w-80 rounded-lg bg-rose-600 font-bold text-white text-center">Check Out</button>
                </div>
              </div>
            </div>
        
        ) }
    </div>
  )
}

export default dynamic(()=> Promise.resolve(Cart), {ssr:false})
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Checkout from '../components/Checkout'
import {Store} from '../context/CartContext'

export default function ShippingScreen() {
  const {handleSubmit, register , formState : {errors}, setValue} = useForm();
  const {cart,dispatch} = useContext(Store);
  const {shippingAddress} = cart;
  const router = useRouter();

  useEffect(()=>{
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  },[setValue, shippingAddress])
  
  const submitHandler = ({fullName,address,city,postalCode,country,location}) => {  
      
    dispatch({
      type:'SAVE_SHIPPING_ADDRESS',
      payload: {fullName,address,city,postalCode,country}
    });

    Cookies.set('cart', JSON.stringify({...cart, ShippingScreen : {fullName,address,city,postalCode,country}}));

    router.push('/payment')
  }

  return (
    <div className='pt-28 px-3 sm:px-0 max-h-screen'>
        <Checkout activeStep={1}/>
        <form className="max-w-screen-md mx-auto" onSubmit={handleSubmit(submitHandler)}>
          <h1 className='mb-4 text-2xl font-medium'>Shipping Address</h1>
          <div className='mb-4'>
            <label htmlFor='fullName' className='font-medium'>Full Name</label>
            <input className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus {...register('fullName', {required:'Please enter your full name'})}/>
            {errors.fullName && (<div className='text-red-500'>{errors.fullName.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='address' className='font-medium'>Address</label>
            <input className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus {...register('address', {required:'Please enter your address'})}/>
            {errors.address && (<div className='text-red-500'>{errors.address.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='city' className='font-medium'>City</label>
            <input className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus {...register('city', {required:'Please enter Postal Code'})}/>
            {errors.city && (<div className='text-red-500'>{errors.city.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='postalCode' className='font-medium'>Postal Code</label>
            <input className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus {...register('postalCode', {required:'Please enter Postal Code'})}/>
            {errors.postalCode && (<div className='text-red-500'>{errors.postalCode.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='country' className='font-medium'>Country</label>
            <input className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring ' autoFocus {...register('country', {required:'Please enter your Country'})}/>
            {errors.country && (<div className='text-red-500'>{errors.country.message}</div>)}
          </div>
          <div>
            <button className='w-24 h-10 rounded bg-rose-500 text-white font-semibold text-base '>Next</button>
          </div>
        </form>
    </div>
  )
}



ShippingScreen.auth = true;


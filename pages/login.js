import React from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'

function LoginScreen() {

    const {handleSubmit,register, formState:{errors}} = useForm();

    const submitHandler = ({email,password}) => {

    }
  return (
    <div className='pt-28 px-3 sm:px-0 max-h-screen'>
       <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
       <h1 className='mb-4 text-2xl'>Login</h1>
       <div className='mb-4'>
        <label htmlFor='email'>Email</label>
        <input {...register('email', {required:'Please enter email', pattern:{ value : /^[a-zA-Z0-9_.+-]+@[a-zA_Z0-9-]+.[a-zA-Z0-9-.]+$/i, message: 'Please enter valid email'}})} type = "email" id='email' className='w-full border rounded-md p-2 outline-none ring-indigo-200 focus:ring' autoFocus/>
        {errors.email && (
            <div className='text-red-500 pt-1'>{errors.email.message}</div>
        )}
       </div>
       <div className='mb-4'>
        <label htmlFor='password'>Password</label>
        <input {...register('password',{required:'Please enter password' ,minLength:{value:6, message: 'Password should be at least six characters'}})}type = "password" id='password' className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus/>
        {errors.password && (
            <div className='text-red-500 pt-1'>{errors.password.message}</div>
        )}
       </div>
        <div className='mb-4'>
            <button className ="h-10 w-full rounded-lg bg-rose-400 font-bold text-white text-center hover:bg-rose-600">Login</button>
        </div>
        <div>
         Don&apos;t have an account? &nbsp;
         <Link href="register">Register</Link>
        </div>
      </form>

    </div>
  )
}

export default LoginScreen
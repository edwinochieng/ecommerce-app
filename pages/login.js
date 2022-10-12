import React from 'react'
import Link from 'next/link'

function LoginScreen() {
  return (
    <div className='pt-28 px-3 sm:px-0 max-h-screen'>
       <form className='mx-auto max-w-screen-md'>
       <h1 className='mb-4 text-2xl'>Login</h1>
       <div className='mb-4'>
        <label htmlFor='email'>Email</label>
        <input type = "email" id='email' className='w-full border rounded-md p-2 outline-none ring-indigo-200 focus:ring' autoFocus/>
       </div>
       <div className='mb-4'>
        <label htmlFor='password'>Password</label>
        <input type = "password" id='password' className='w-full border rounded-md p-2 outline-none ring-indigo-300 focus:ring' autoFocus/>
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
import React from 'react'
import products from '../utils/data'
import Product from './Product'

function Layout() {
  return (
    <div className='min-h-screen pt-12 sm:pt-16 lg:pt-20 px-14 sm:px-10 lg:px-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
       {products.map(product => (
        <Product key={product.id} product={product}/>
       ))}
    </div>
  )
}

export default Layout
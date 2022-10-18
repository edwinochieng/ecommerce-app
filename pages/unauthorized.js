import useRouter  from 'next/router'
import React from 'react'

function Unauthorized() {
    const router = useRouter();
    const {message} = router.query;

  return (
    <div className='pt-28 px-3 sm:px-0 max-h-screen'>
        <h1>Access Denied</h1>
        {message && <div className='my-4 text-red-500'>{message}</div>}
    </div>
  )
}

export default Unauthorized
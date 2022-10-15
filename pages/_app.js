import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { GlobalProvider } from '../context/CartContext'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return(
    <>
      <SessionProvider session={session}>
      <GlobalProvider>
      <Navbar/>
      <Component {...pageProps} />
      </GlobalProvider>
      
      </SessionProvider>
      
    </>
  ) 
}

export default MyApp

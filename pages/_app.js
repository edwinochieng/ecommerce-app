import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { GlobalProvider } from '../context/CartContext'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <GlobalProvider>
      <Navbar/>
      <Component {...pageProps} />
      </GlobalProvider>
      
    </>
  ) 
}

export default MyApp

import Head from 'next/head'
import HeroBanner from '../components/HeroBanner'
import Layout from '../components/Layout'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>E-commerce App</title>
      </Head>
      <ToastContainer position='bottom-center' limit={1}/>
      <HeroBanner/>
      <Layout/>
    </div>
  )
}

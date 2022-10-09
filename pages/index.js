import Head from 'next/head'
import HeroBanner from '../components/HeroBanner'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div >
      <Head>
        <title>E-commerce App</title>
      </Head>
      <HeroBanner/>
      <Layout/>
    </div>
  )
}

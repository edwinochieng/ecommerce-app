import Head from "next/head";
import HeroBanner from "../components/HeroBanner";
import ProductItem from "../components/Product";
import Product from "../models/Product";
import { convertDocToObj } from "../utils/db";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>E-commerce App</title>
      </Head>
      <HeroBanner />
      <div className='pt-12 sm:pt-16 lg:pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(convertDocToObj),
    },
  };
}

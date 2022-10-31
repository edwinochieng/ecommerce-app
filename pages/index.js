import axios from "axios";
import Head from "next/head";
import { useContext } from "react";
import { toast } from "react-toastify";
import HeroBanner from "../components/HeroBanner";
import ProductItem from "../components/Product";
import { Store } from "../context/CartContext";
import Product from "../models/Product";
import { convertDocToObj } from "../utils/db";

export default function Home({ products }) {
  const { cart, dispatch } = useContext(Store);

  const addToCart = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data?.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock!");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    });

    toast.success("Added to Cart");
  };
  return (
    <div>
      <Head>
        <title>E-commerce App</title>
      </Head>
      <HeroBanner />
      <div className='pt-12 sm:pt-16 lg:pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCartHandler={addToCart}
          />
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

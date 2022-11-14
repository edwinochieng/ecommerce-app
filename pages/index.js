import axios from "axios";
import Head from "next/head";
import { useContext } from "react";
import { toast } from "react-toastify";
import HeroBanner from "../components/HeroBanner";
import ProductItem from "../components/Product";
import { Store } from "../context/CartContext";
import Product from "../models/Product";
import User from "../models/User";
import { users, goods } from "../utils/data";
import { connectDB, convertDocToObj } from "../utils/db";

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
        <title>Ecommerce App</title>
      </Head>
      <HeroBanner />
      <div className='py-8 sm:py-16 '>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8'>
          {products?.map((product) => (
            <ProductItem
              key={product.name}
              product={product}
              addToCartHandler={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await connectDB();
  await User.deleteMany();
  await User.insertMany(users);
  await Product.deleteMany();
  await Product.insertMany(goods);
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(convertDocToObj),
    },
  };
}

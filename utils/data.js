import bcrypt from "bcryptjs";

export const users = [
  {
    name: "John",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "Jane",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
export const products = [
  {
    name: "Iphone 14 Pro",
    slug: "iphone-14-pro",
    category: "Mobile",
    picture: "/products/iphone.png",
    price: 120,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Airpods",
    slug: "airpods",
    category: "Audio",
    picture: "/products/airpods.png",
    price: 15,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Ear buds",
    slug: "ear-buds",
    category: "Audio",
    picture: "/products/freebuds.png",
    price: 15,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Samsung Galaxy S22 ",
    slug: "galaxy-S22",
    category: "Mobile",
    picture: "/products/galaxy.png",
    price: 150,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Headset",
    slug: "headset",
    category: "Audio",
    picture: "/products/headset.png",
    price: 50,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Macbook Pro",
    slug: "macbook-pro",
    category: "Laptops",
    picture: "/products/macbook.png",
    price: 220,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "MSI",
    slug: "msi",
    category: "Laptops",
    picture: "/products/msi.png",
    price: 120,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Redmi",
    slug: "redmi",
    category: "Mobile",
    picture: "/products/redmi.png",
    price: 120,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
  {
    name: "Rog gaming laptop",
    slug: "rog",
    category: "Mobile",
    picture: "/products/rog.png",
    price: 120,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The iPhone 14 features the same A15 Bionic chip that powered the iPhone 13 Pro and iPhone 13 Pro Max. Compared to the A15 Bionic chip in last year's standard iPhone 13, the iPhone 14's chip features one additional GPU core. CNET said the iPhone 14 is speedy with fluid animations and no performance hiccups",
  },
];

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
export const goods = [
  {
    name: "Iphone 14 Pro",
    slug: "iphone-14-pro",
    category: "Mobile",
    picture: "/products/iphone.png",
    price: 1400,
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
    price: 179,
    rating: 4.5,
    numReviews: 37,
    countInStock: 10,
    description:
      " They feature an external redesign with shorter stems similar to AirPods Pro and use similar force touch controls. They include support for spatial audio and Dolby Atmos, IPX4 water resistance, skin detection and a case supporting MagSafe charging. Apple claims increased battery life, with AirPods lasting six hours and the charging case providing up to 30 hours. The third generation AirPods were released on October 26, 2021, and are priced at $179. In September 2022.The model numbers for the third-generation AirPods are A2565 and A2564",
  },
  {
    name: "Ear buds",
    slug: "ear-buds",
    category: "Audio",
    picture: "/products/freebuds.png",
    price: 99,
    rating: 4.5,
    numReviews: 16,
    countInStock: 9,
    description:
      "The Huawei Freebuds 4i can be connected with any device through Bluetooth and act as standard wireless earphones. However, to get all the extra features, you need the Huawei AI Life app. Pro tip - download it from the AppGallery or the QR code on the box because, as the company confirmed with us; the Google Play version might have issues with some non-Huawei smartphones. The app allows you to check the battery charge levels and customize the buds' controls - default is double-tap for play/pause, touch & hold is noise control modes. There are three of those modes - Noise cancellation, Off, and Awareness. While long press cycles through all of them, you can disable some of them through the app.",
  },
  {
    name: "Samsung Galaxy S22 ",
    slug: "galaxy-S22",
    category: "Mobile",
    picture: "/products/galaxy.png",
    price: 1200,
    rating: 4.5,
    numReviews: 37,
    countInStock: 50,
    description:
      "Samsung Galaxy S22 Ultra comes with a 12GB RAM and 256GB ROM. Galaxy S22 Ultra  camera setup will include a 108 MP Quad rear camera and a 40 MP selfie camera. Display of Galaxy S22 Ultra supports up to 1080×2400 pixels resolution and screen size of 6.8″ inches. The triple Rear Camera and Selfie Camera offer innovative camera hardware and software so you can easily shoot a Gallery full of share-worthy content. The fastest chip ever on Galaxy - Whether you're vlogging your day, gaming all night or simply scrolling your feed, the 4nm processor makes for an incredibly smooth experience. Sunlight, meet Galaxy S22 Ultra brightest display. The stunning Dynamic AMOLED 2X display is crafted specifically for high outdoor visibility, keeping the view clear in bright daylight. Order for this Samsung Galaxy S22 Ultra 5G online from Jumia Kenya and have it delivered to your doorstep.",
  },
  {
    name: "Headset",
    slug: "headset",
    category: "Audio",
    picture: "/products/headset.png",
    price: 600,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "Whether you want to relax on the noisy journey home from work or unwind with your favourite albums after a long week, you'll love using the Sony WH-1000XM4 Wireless Bluetooth Noise-Cancelling Headphones. Adaptive noise-cancelling filters out background noise so you can focus on your music or podcast. And with Adaptive Sound Control, the Sony WH1000XM4 Headphones intelligently adapts to your environment to deliver the best possible noise-cancelling experience. High-resolution audio playback The Sony 1000XM4 Headphones let you hear those mp3 tunes like you have never heard them before. While mp3 compresses the original audio file, compromising quality, Sonys innovative DSEE HX technology upscales your files, so you can hear every glorious element of the mix, just as the artist intended. Sony's LDAC audio coding technology transfers three times more data than standard Bluetooth audio, making everything from the vocals to the percussion sound crisp, punchy, and clear.",
  },
  {
    name: "Macbook Pro",
    slug: "macbook-pro",
    category: "Laptops",
    picture: "/products/macbook.png",
    price: 2200,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "APPLE 13 MacBook Pro with Touch Bar, Space GreyUpgraded processor lets you get more done Everything you love about the MacBook Pro . But with more power. The 2019 version of the MacBook Pro is perfect for all your creative projects, but now that you have got an upgraded processor, everything is faster and smoother. With superfast SSD storage, you will be able to save files, load programs and access huge video and image files in a moment. Touch Bar with Touch ID the Touch Bar replaces the function keys at the top of your keyboard, so you can see relevant controls depending on what you are doing. Watching a film? Rewind or skip forward with the Touch Bar. Editing photos? Adjust, crop and filter the image all from the Touch Bar. Touch ID provides advanced security for everything you do. Unlock your MacBook securely, use Apple Pay without remembering your password, and access private files with just your fingerprint. Razor thin and feather light Take your MacBook Pro with you wherever you are - the library, the daily commute, an important business meeting. It is razor thin at 14.9 mm and feather light at just 1.37 kg. You have got up to 10 hours of battery life when you are using it non-stop. Perfect for a full working day and beyond. Brilliant Retina display Enjoy enhanced videos, images, and games with the enhanced Retina display that is brighter and more colourful than previous generations. The LED backlit display offers true-to-life images with vivid, realistic details essential for graphic design, colour grading, and editing.",
  },
  {
    name: "MSI",
    slug: "msi",
    category: "Laptops",
    picture: "/products/msi.png",
    price: 1300,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "The MSI GF series delivers high performance. Equipped with GeForce GTX 1060 GPUs give you up to 3X the performance of previous-generation GPUs. They're built with ultra-fast FinFET, the latest high-bandwidth memory technologies, and support for DirectX 12 features to deliver the fastest, smoothest gaming notebook experience. Best of all, it is VR ready. get your VIVE or Oculus on and immerse yourself into your virtual world.",
  },
  {
    name: "Redmi",
    slug: "redmi",
    category: "Mobile",
    picture: "/products/redmi.png",
    price: 300,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      " Redmi 10C is the latest Redmi 10 series handset to go official. The handset sports a waterdrop notch display on the front and its textured rear shell has a squarish camera module which not only houses a dual-camera system, but also a fingerprint scanner. The handset replaces the Redmi 9C smartphone from last year.",
  },
  {
    name: "Rog gaming laptop",
    slug: "rog",
    category: "Mobile",
    picture: "/products/rog.png",
    price: 1900,
    rating: 4.5,
    numReviews: 37,
    countInStock: 20,
    description:
      "ATHLETIC APPEALSporty aesthetics in three distinct colors take your look to the next-level. Stealthy Original Black, cool Eclipse Gray, and bright Electro Punk personas show off your gaming style. Play anywhere on a chassis thats up to 7% smaller and more portable than previous generations. Subtle cut-outs and icons adorn the exterior and even add intrigue to the bottom of the laptop, setting the system apart at any angleLight em upIlluminate your life in RGB. A redesigned light bar increases the density of LEDs to create a more refined underglow beneath the chassis. Personalize your Aura Sync settings to set the ideal gaming mood across an entire ecosystem of compatible devices. Sporting good looksFrom its aluminum-capped lid to its textured base, this laptop blends everyday durability with athletic style. The metal top resists knocks and bumps while also enabling slimmer bezels. The plastic palm rest stays cooler to the touch for more comfortable marathon gaming sessions. And the crosshatched grip along the bottom stays planted while playing and makes the chassis easier to grab on the go.Smaller sizeThe new Strix series packs serious gaming power into a more portable chassis. For 15” models, the footprint is 7% smaller than the previous generation, while 17 versions are 5% smaller. The trim and streamlined chassis makes it easier than ever to jump in-game anywhere. It also enables an 85% screen-to-body ratio with superslim bezels that make gameplay more immersive. Bigger touchpadImprove everyday comfort and usability with an active touchpad area thats 85% larger than previous generations. More space means greater precision along with more comfortable hand movements and gestures while youre navigating. The glass pad is coated in a matte finish that adds strength with a silky smooth feel.",
  },
];

import { useState, useEffect } from 'react';
import {
  Nav,
  Footer,
  StarRating,
  DisplayStarRating,
  WriteComment,
  HeartButton,
  ProductComments,
  WriteReviewButton,
} from '../components';
import { Dracon, Hurma, Crugl1, Crugl3 } from '../assets/images';
import { UkrIcon, UserIcon1, HitrijLis, ShrekIcon } from '../assets/icons';
import { FaPencil } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchAsyncProductSingle,
//   getProductSingle,
//   getSingleProductStatus,
// } from '../../store/productSlice';
// import { STATUS } from '../../utils/status';
// import Loader from '../../components/Loader/Loader';
// import { formatPrice } from '../../utils/helpers';
// import {
//   addToCart,
//   getCartMessageStatus,
//   setCartMessageOff,
//   setCartMessageOn,
// } from '../../store/cartSlice';
// import CartMessage from '../../components/CartMessage/CartMessage';

const ProductSinglePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgImage, setBgImage] = useState('');

  const [isWriteComentOpen, setIsWriteComentOpen] = useState(false);

  const toggleWriteComent = () => setIsWriteComentOpen(!isWriteComentOpen);

  // ----------------------------------------------
  const product = {
    id: 1,
    title: 'Товар Дракон',
    description: 'Eco-friendly wall clock made from recycled wood.',
    price: 1500,
    zsuPrice: 15,
    reviewsQty: 5,
    rating: 4.3,
    createdAt: '2024-04-20T00:00:00Z',
    categoryId: 1,
    photos: [
      'img/photo1.jpg',
      'img/photo2.jpg',
      'img/photo3.jpg',
      'img/photo4.jpg',
    ],
    userId: 1,
  };
  // ----------------------------------------------

  useEffect(() => {
    fetch(UkrIcon)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setBgImage(reader.result);
        };
      });
  }, [UkrIcon]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const mini_images = [
    { src: Dracon, alt: 'Dracon' },
    { src: Hurma, alt: 'Hurma' },
    { src: Crugl1, alt: 'Crugl1' },
    { src: Crugl3, alt: 'Crugl3' },
  ];

  const comments = [
    {
      avatar: ShrekIcon,
      rating: 4,
      date: '2024-04-20',
      text: 'Отличный товар, полностью соответствует описанию!',
    },
    {
      avatar: HitrijLis,
      rating: 5,
      date: '2024-04-19',
      text: 'Этот товар просто потрясающий, я очень доволен покупкой!',
    },
    {
      avatar: ShrekIcon,
      rating: 3,
      date: '2024-04-18',
      text: 'Неплохой товар за свою цену, но есть некоторые недостатки.',
    },
  ];

  return (
    <main>
      <section className="pb-16">
        <Nav />
      </section>
      <div className="max-w-[1440px] m-auto">
        <div className="w-full flex bg-[#f5f5f5]  p-8 justify-between items-start max-md:flex-col  max-md:items-center">
          <div className="w-full flex  max-w-[50%] max-md:max-w-[100%]">
            <ul className="mr-4">
              {/* <li className="max-w-16 max-h-20 mb-8 relative">
                <img
                  src={Dracon}
                  alt="gg"
                  className="max-w-full max-h-full object-cover"
                />
              </li> */}

              {mini_images.slice(0, 4).map((image, index) => (
                <li
                  key={index}
                  // className="max-w-16 max-h-20 mb-4 p-2 relative bg-white rounded-lg shadow-md border-2"
                  className={`max-w-16 max-h-20 mb-4 p-2 relative bg-white rounded-lg shadow-md border-2 ${
                    activeIndex === index
                      ? 'border-orange-500'
                      : 'border-gray-300'
                  }`} // Conditional class for border color
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-full object-cover"
                    onClick={() => toggleActive(index)}
                  />
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center items-center max-w-[600px] h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={mini_images[activeIndex].src}
                className="max-w-[400px] max-h-[400px]"
                alt={mini_images[activeIndex].alt}
              />
            </div>
            <HeartButton productId={1} />
          </div>
          <div className="w-full flex flex-col max-w-[50%] max-md:max-w-[100%] p-4 gap-4">
            <h2 className="font-bold text-2xl font-palanquin">
              {product.title}
            </h2>
            <div className="star ">
              <ul className="flex  gap-3">
                <li className="flex items-center">
                  <DisplayStarRating rating={4} />
                </li>
                <li className="font-bold">оцінка {product.rating}</li>
                <WriteReviewButton toggleWriteComent={toggleWriteComent} />
              </ul>
            </div>
            <ul className="flex gap-2 items-end">
              <li className="font-bold text-2xl">{product.price}</li>
              <li
                // className={`bg-[url(${UkrIcon})] bg-no-repeat bg-center bg-contain`}
                className="bg-no-repeat bg-center bg-contain"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <p>{product.zsuPrice} грн</p>
              </li>
              {/* <li>
                <button className="flex items-center justify-center bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full">
                  <FaShoppingCart size={20} />
                </button>
              </li> */}
              <li className="">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center relative gap-4">
                  <p className="z-10">Додати до кошику</p>
                  <div className="w-px h-full bg-white absolute inset-0 mx-auto left-32"></div>
                  <FaShoppingCart size={20} className="z-10" />
                </button>
              </li>
            </ul>
            <div>
              <h3 className="font-semibold text-base">Опис</h3>
              <p className="font-poppins">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
                ipsa facilis delectus, reiciendis laborum, reprehenderit iste
                voluptas sequi, facere iure provident voluptatem culpa eligendi
                repellendus inventore. Blanditiis necessitatibus beatae
                dignissimos!
                {/* {product.description} */}
              </p>
            </div>
            <div className="flex  items-center bg-white p-4 shadow-md rounded-lg gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <img
                  src={UserIcon1}
                  alt="Seller Image"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Информация о продавце */}
              <div>
                {/* Название продавца */}
                <h2 className="text-xl font-semibold">Олег Петрович</h2>
                {/* Имя продавца */}
                <p className="text-gray-600">Продавець</p>
                {/* Оценка продавца (звездочки) */}
                <div className="flex items-center">
                  <DisplayStarRating rating={3} size={20} />
                  {/* Связаться с продавцом */}
                  {/* <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"> */}
                  <button className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 font-bold text-white rounded-md transition duration-200">
                    Зв'язатися
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ProductComments
          productName={product.title}
          comments={comments}
          toggleWriteComent={toggleWriteComent}
        />
      </section>
      <section>
        <Footer />
      </section>
      {isWriteComentOpen && <WriteComment closeModal={toggleWriteComent} />}
    </main>
  );
};

export default ProductSinglePage;

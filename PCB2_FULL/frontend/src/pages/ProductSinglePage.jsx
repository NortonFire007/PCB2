import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import $api from '../http';
import {
  Nav,
  Footer,
  StarRating,
  DisplayStarRating,
  WriteComment,
  ProductComments,
  WriteReviewButton,
} from '../components';
import { addItemToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { UkrIcon, UserIcon1, HitrijLis, ShrekIcon } from '../assets/icons';
import { FaPencil } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import HeartButton from '../components/HeartButton/HeartButton';
import SellerMiniCard from '../SellerMiniCard';

const ProductSinglePage = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWriteCommentOpen, setIsWriteCommentOpen] = useState(false);
  const { id } = useParams();

  const toggleWriteComment = () => setIsWriteCommentOpen(!isWriteCommentOpen);

  useEffect(() => {
    $api
      .get(
        `/product/${id}?images=True&comments=True&product_owner=True&rating_info=True`
      )
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const addToBucket = (product) => {
    const item = {
      product_id: product.id,
      quantity: 1,
      price: product.price,
    };
    console.log('item', item);
    dispatch(addItemToCart(item));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="pb-16">
        <Nav />
      </section>
      <div className="max-w-[1440px] m-auto">
        <div className="w-full flex bg-[#f5f5f5] p-8 justify-between items-start max-md:flex-col max-md:items-center">
          <div className="w-full flex max-w-[50%] max-md:max-w-[100%] relative">
            <ul className="mr-4">
              {product.images.map((image, index) => (
                <li
                  key={index}
                  className={`max-w-16 max-h-20 mb-4 p-2 relative bg-white rounded-lg shadow-md border-2 ${
                    activeIndex === index
                      ? 'border-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  <img
                    src={`http://127.0.0.1:5000/${image.path}`}
                    alt={`Image ${index}`}
                    className="max-w-full max-h-18 object-cover"
                    onClick={() => toggleActive(index)}
                  />
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center items-center max-w-[600px] h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`http://127.0.0.1:5000/${product.images[activeIndex].path}`}
                className="max-w-[400px] max-h-[400px]"
                alt={`Image ${activeIndex}`}
              />
            </div>
            <div className="absolute rounded-full bg-slate-50 w-10 h-10 right-6 top-4">
              <HeartButton productId={product.id} />
            </div>
          </div>
          <div className="w-full flex flex-col max-w-[50%] max-md:max-w-[100%] p-4 gap-4">
            <h2 className="font-bold text-2xl font-palanquin">
              {product.title}
            </h2>
            <div className="star ">
              <ul className="flex gap-3">
                <li className="flex items-center">
                  Оцінка: {product.rating || 'Нема оцінок'}
                </li>
                <WriteReviewButton toggleWriteComent={toggleWriteComment} />
              </ul>
            </div>
            <ul className="flex gap-2 items-center">
              <li className="font-bold text-2xl">{product.price} грн</li>
              <li className="bg-no-repeat bg-center bg-contain">
                <p>{product.zsuPrice} 15 грн</p>
              </li>
              <li className="">
                <button
                  onClick={() => addToBucket(product)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center relative gap-4"
                >
                  <p className="z-5">Додати до кошику</p>
                  <div className="w-px h-full bg-white absolute inset-0 mx-auto left-32"></div>
                  <FaShoppingCart size={20} className="z-5" />
                </button>
              </li>
            </ul>
            <div>
              <h3 className="font-semibold text-base">Опис</h3>
              <p className="font-poppins">{product.description}</p>
            </div>
            <SellerMiniCard product_owner={product.product_owner} />
          </div>
        </div>
      </div>
      <section className="pb-16">
        <ProductComments
          productName={product.title}
          comments={product.comments}
          rating={product.rating}
          ratingInfo={product.rating_info}
          toggleWriteComent={toggleWriteComment}
        />
      </section>
      <section>
        <Footer />
      </section>
      {isWriteCommentOpen && (
        <WriteComment closeModal={toggleWriteComment} productId={id} />
      )}
    </main>
  );
};

export default ProductSinglePage;

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import $api from '../http';
// import {
//   Nav,
//   Footer,
//   StarRating,
//   DisplayStarRating,
//   WriteComment,
//   ProductComments,
//   WriteReviewButton,
// } from '../components';
// import { addItemToCart } from '../redux/slices/cartSlice';
// import { useDispatch } from 'react-redux';
// import { FaPencil } from 'react-icons/fa6';
// import { FaShoppingCart } from 'react-icons/fa';
// import HeartButton from '../components/HeartButton/HeartButton';
// import SellerMiniCard from '../SellerMiniCard';

// const ProductSinglePage = () => {
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isWriteCommentOpen, setIsWriteCommentOpen] = useState(false);
//   const { id } = useParams();

//   const toggleWriteComment = () => setIsWriteCommentOpen(!isWriteCommentOpen);

//   useEffect(() => {
//     $api
//       .get(
//         `/product/${id}?images=True&comments=True&product_owner=True&rating_info=True`
//       )
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching product:', error);
//       });
//   }, [id]);

//   const toggleActive = (index) => {
//     setActiveIndex(index);
//   };

//   const addToBucket = (product) => {
//     const item = {
//       product_id: product.id,
//       quantity: 1,
//       price: product.price,
//     };
//     console.log('item', item);
//     dispatch(addItemToCart(item));
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <main>
//       <section className="pb-16">
//         <Nav />
//       </section>
//       <div className="max-w-[1440px] m-auto">
//         <div className="w-full flex bg-[#f5f5f5] p-8 justify-between items-start max-md:flex-col max-md:items-center">
//           <div className="w-full flex max-w-[50%] max-md:max-w-[100%] relative">
//             <ul className="mr-4">
//               {product.images.map((image, index) => (
//                 <li
//                   key={index}
//                   className={`max-w-16 max-h-20 mb-4 p-2 relative bg-white rounded-lg shadow-md border-2 ${
//                     activeIndex === index
//                       ? 'border-orange-500'
//                       : 'border-gray-300'
//                   }`}
//                 >
//                   <img
//                     src={`http://127.0.0.1:5000/${image.path}`}
//                     alt={`Image ${index}`}
//                     className="max-w-full max-h-18 object-cover"
//                     onClick={() => toggleActive(index)}
//                   />
//                 </li>
//               ))}
//             </ul>
//             <div className="w-full flex justify-center items-center max-w-[600px] h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
//               <img
//                 src={`http://127.0.0.1:5000/${product.images[activeIndex].path}`}
//                 className="max-w-[400px] max-h-[400px]"
//                 alt={`Image ${activeIndex}`}
//               />
//             </div>
//             <div className="absolute rounded-full bg-slate-50 w-10 h-10 right-6 top-4">
//               <HeartButton productId={product.id} />
//             </div>
//           </div>
//           <div className="w-full flex flex-col max-w-[50%] max-md:max-w-[100%] p-4 gap-4">
//             <h2 className="font-bold text-2xl font-palanquin">
//               {product.title}
//             </h2>
//             <div className="star ">
//               <ul className="flex gap-3">
//                 <li className="flex items-center">
//                   Оцінка: {product.rating || 'Нема оцінок'}
//                 </li>
//                 <WriteReviewButton toggleWriteComent={toggleWriteComment} />
//               </ul>
//             </div>
//             <ul className="flex gap-2 items-center">
//               <li className="font-bold text-2xl">{product.price} грн</li>
//               <li
//                 // className={`bg-[url(${UkrIcon})] bg-no-repeat bg-center bg-contain`}
//                 className="bg-no-repeat bg-center bg-contain"
//                 // style={{ backgroundImage: `url(${bgImage})` }}
//               >
//                 <p>{product.zsuPrice} 15 грн</p>
//               </li>
//               {/* <li>
//                 <button className="flex items-center justify-center bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full">
//                   <FaShoppingCart size={20} />
//                 </button>
//               </li> */}
//               <li className="">
//                 <button
//                   onClick={() => addToBucket(product)}
//                   className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center relative gap-4"
//                 >
//                   <p className="z-5">Додати до кошику</p>
//                   <div className="w-px h-full bg-white absolute inset-0 mx-auto left-32"></div>
//                   <FaShoppingCart size={20} className="z-5" />
//                 </button>
//               </li>
//             </ul>
//             <div>
//               <h3 className="font-semibold text-base">Опис</h3>
//               <p className="font-poppins">{product.description}</p>
//             </div>
//             <SellerMiniCard product_owner={product.product_owner} />
//           </div>
//         </div>
//       </div>
//       <section className="pb-16">
//         <ProductComments
//           productName={product.title}
//           comments={product.comments}
//           toggleWriteComent={toggleWriteComment}
//         />
//       </section>
//       <section>
//         <Footer />
//       </section>
//       {isWriteCommentOpen && (
//         <WriteComment closeModal={toggleWriteComment} productId={id} />
//       )}
//     </main>
//   );
// };

// export default ProductSinglePage;

import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  removeItemFromCart,
  selectCartItems,
} from '../../redux/slices/cartSlice';
import BucketProductCard from './BucketProductCard';
import { EmptyBucket2 } from '../../assets/icons';

const Bucket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const toggleBucket = () => {
    setIsOpen(!isOpen);
  };

  const closeBucket = () => {
    setIsOpen(false);
  };

  const removeFromBucket = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const calculateTotalSum = () => {
    let totalSum = 0;
    if (Array.isArray(cartItems)) {
      cartItems.forEach((item) => {
        totalSum += item.price;
      });
    }
    return totalSum;
  };

  return (
    <div className="relative">
      <button onClick={toggleBucket} className="hover:border p-2 rounded">
        <FaShoppingCart size={25} />
        {cartItems.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[50%] right-[-10%]">
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Кошик</h2>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={closeBucket}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            <ul className="max-h-[400px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <BucketProductCard
                  key={index}
                  {...item}
                  removeFromBucket={() => removeFromBucket(item.id)}
                  closeBucket={() => closeBucket()}
                />
              ))}
            </ul>
          ) : (
            <div className="absolute left-[34%] top-[18%] max-md:top-[30%] max-md:left-[30%]">
              <img
                src={EmptyBucket2}
                alt="Порожній кошик"
                className="w-[50%] max-md:w-[60%]"
              />
              <p className="absolute left-[10%] max-md:left-[0%] font-bold">
                Кошик порожній
              </p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="absolute bottom-4 right-4">
              <p className="text-xl font-bold">
                Усього: {calculateTotalSum()} грн.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                Оформити замовлення
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bucket;

// import { useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchCart,
//   removeItemFromCart,
//   selectCartItems,
// } from '../../redux/slices/cartSlice';
// import BucketProductCard from './BucketProductCard';
// import { EmptyBucket2 } from '../../assets/icons';

// const Bucket = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleBucket = () => {
//     console.log('cartItems', cartItems);
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       dispatch(fetchCart());
//     }
//   };

//   const closeBucket = () => {
//     setIsOpen(false);
//   };

//   const removeFromBucket = (itemId) => {
//     dispatch(removeItemFromCart(itemId));
//   };

//   // const addToBucket = (item) => {
//   //   dispatch(addItemToCart(item));
//   // };

//   const calculateTotalSum = () => {
//     let totalSum = 0;
//     if (Array.isArray(cartItems)) {
//       cartItems.forEach((item) => {
//         totalSum += item.price;
//       });
//     }
//     return totalSum;
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleBucket} className="hover:border p-2 rounded">
//         <FaShoppingCart size={25} />
//         {cartItems.length > 0 && (
//           <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[50%] right-[-10%]">
//             {cartItems.length}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Кошик</h2>
//             <button
//               className="text-gray-600 hover:text-gray-900"
//               onClick={closeBucket}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>
//           </div>

//           {Array.isArray(cartItems) && cartItems.length > 0 ? (
//             <ul className="max-h-[400px] overflow-y-auto">
//               {cartItems.map((item, index) => (
//                 <BucketProductCard
//                   key={index}
//                   {...item}
//                   removeFromBucket={() => removeFromBucket(item.id)}
//                 />
//               ))}
//             </ul>
//           ) : (
//             <div className="absolute left-[34%] top-[18%] max-md:top-[30%]  max-md:left-[30%]">
//               <img
//                 src={EmptyBucket2}
//                 alt="Порожній кошик"
//                 className="w-[50%] max-md:w-[60%]"
//               />
//               <p className="absolute left-[10%] max-md:left-[0%] font-bold">
//                 Кошик порожній
//               </p>
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <div className="absolute bottom-4 right-4">
//               <p className="text-xl font-bold">
//                 Усього: {calculateTotalSum()} грн.
//               </p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
//                 Оформити замовлення
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bucket;

// import { useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchCart,
//   selectCartItems,
//   removeItemFromCart,
// } from '../redux/slices/cartSlice';
// import BucketProductCard from './BucketProductCard';
// import { EmptyBucket2 } from '../assets/icons';

// const Bucket = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleBucket = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       dispatch(fetchCart());
//     }
//   };

//   const closeBucket = () => {
//     setIsOpen(false);
//   };

//   const removeFromBucket = (itemId) => {
//     dispatch(removeItemFromCart(itemId));
//   };

//   const calculateTotalSum = () => {
//     let totalSum = 0;

//     if (Array.isArray(cartItems)) {
//       cartItems.forEach((item) => {
//         totalSum += item.price;
//       });
//     }

//     return totalSum;
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleBucket} className="hover:border p-2 rounded">
//         <FaShoppingCart size={25} />
//         {cartItems.length > 0 && (
//           <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[50%] right-[-10%]">
//             {cartItems.length}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Кошик</h2>
//             <button
//               className="text-gray-600 hover:text-gray-900"
//               onClick={closeBucket}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {Array.isArray(cartItems) && cartItems.length > 0 ? (
//             <ul className="max-h-[400px] overflow-y-auto">
//               {cartItems.map((item, index) => (
//                 <BucketProductCard
//                   key={index}
//                   {...item}
//                   removeFromBucket={() => removeFromBucket(item.id)}
//                 />
//               ))}
//             </ul>
//           ) : (
//             <div className="absolute left-[34%] top-[18%] max-md:top-[30%]  max-md:left-[30%]">
//               <img
//                 src={EmptyBucket2}
//                 alt="Порожній кошик"
//                 className="w-[50%] max-md:w-[60%]"
//               />
//               <p className="absolute left-[10%] max-md:left-[0%] font-bold">
//                 Кошик порожній
//               </p>
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <div className="absolute bottom-4 right-4">
//               <p className="text-xl font-bold">
//                 Усього: {calculateTotalSum()} грн.
//               </p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
//                 Оформити замовлення
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bucket;

// import { useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { EmptyBucket1, EmptyBucket2 } from '../assets/icons';
// import BucketProductCard from './BucketProductCard';
// import { Dracon, Hurma } from '../assets/images';

// const Bucket = () => {
//   const bucket_data = [
//     {
//       id: 1,
//       title: 'Товар Дракон',
//       description: 'Eco-friendly wall clock made from recycled wood.',
//       photo: Hurma,
//       price: 1500,
//       reviewsQty: 5,
//       rating: 4.3,
//       categoryId: 1,
//     },

//     {
//       id: 3,
//       title: 'Товар Билии Бонка Товар Билии ',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nisi?',
//       photo: Dracon,
//       price: 780,
//       reviewsQty: 24,
//       rating: 3.7,
//       categoryId: 3,
//     },
//   ];

//   const [isOpen, setIsOpen] = useState(false);
//   const [items, setItems] = useState(bucket_data);

//   const toggleBucket = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeBucket = () => {
//     setIsOpen(false);
//   };

//   const addToBucket = (item) => {
//     setItems([...items, item]);
//   };

//   const removeFromBucket = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//   };

//   const calculateTotalSum = (items) => {
//     let totalSum = 0;

//     items.forEach((item) => {
//       totalSum += item.price;
//     });

//     return totalSum;
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleBucket} className="hover:border p-2 rounded">
//         <FaShoppingCart size={25} />
//         {items.length > 0 && (
//           <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[50%] right-[-10%]">
//             {items.length}
//           </span>
//         )}
//       </button>

//       {/* Попап корзины */}
//       {isOpen && (
//         <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Кошик</h2>
//             <button
//               className="text-gray-600 hover:text-gray-900"
//               onClick={closeBucket}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {items.length > 0 ? (
//             <ul className="max-h-[400px] overflow-y-auto">
//               {items.map((item, index) => (
//                 <BucketProductCard
//                   key={index}
//                   {...item}
//                   removeFromBucket={() => removeFromBucket(index)}
//                 />

//                 // <li
//                 //   key={index}
//                 //   className="flex justify-between items-center border-b py-2"
//                 // >
//                 //   <BucketProductCard ...item />
//                 //   {/* <span>{item.name}</span>
//                 //   <button onClick={() => removeFromBucket(index)}>
//                 //     Удалить
//                 //   </button> */}
//                 // </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="absolute left-[34%] top-[18%] max-md:top-[30%]  max-md:left-[30%]">
//               <img
//                 src={EmptyBucket2}
//                 alt="Порожній кошик"
//                 className="w-[50%] max-md:w-[60%]"
//               />
//               <p className="absolute left-[10%] max-md:left-[0%] font-bold">
//                 Кошик порожній
//               </p>
//             </div>
//           )}

//           {items.length > 0 && (
//             <div className="absolute bottom-4 right-4">
//               <p className="text-xl font-bold">
//                 Усього: {calculateTotalSum(items)} грн.
//               </p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
//                 Оформити замовлення
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bucket;

// import { useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchCart,
//   selectCartItems,
//   addItemToCart,
//   removeItemFromCart,
// } from '../redux/slices/cartSlice';
// import BucketProductCard from './BucketProductCard';
// import { EmptyBucket2 } from '../assets/icons';

// const Bucket = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleBucket = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       dispatch(fetchCart());
//     }
//   };

//   const closeBucket = () => {
//     setIsOpen(false);
//   };

//   const removeFromBucket = (itemId) => {
//     dispatch(removeItemFromCart(itemId));
//   };

//   const calculateTotalSum = () => {
//     let totalSum = 0;

//     cartItems.forEach((item) => {
//       totalSum += item.price;
//     });

//     return totalSum;
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleBucket} className="hover:border p-2 rounded">
//         <FaShoppingCart size={25} />
//         {cartItems.length > 0 && (
//           <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center absolute bottom-[50%] right-[-10%]">
//             {cartItems.length}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] max-md:max-w-[320px] bg-white p-4 rounded-lg shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Кошик</h2>
//             <button
//               className="text-gray-600 hover:text-gray-900"
//               onClick={closeBucket}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {cartItems.length > 0 ? (
//             <ul className="max-h-[400px] overflow-y-auto">
//               {cartItems.map((item, index) => (
//                 <BucketProductCard
//                   key={index}
//                   {...item}
//                   removeFromBucket={() => removeFromBucket(item.id)}
//                 />
//               ))}
//             </ul>
//           ) : (
//             <div className="absolute left-[34%] top-[18%] max-md:top-[30%]  max-md:left-[30%]">
//               <img
//                 src={EmptyBucket2}
//                 alt="Порожній кошик"
//                 className="w-[50%] max-md:w-[60%]"
//               />
//               <p className="absolute left-[10%] max-md:left-[0%] font-bold">
//                 Кошик порожній
//               </p>
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <div className="absolute bottom-4 right-4">
//               <p className="text-xl font-bold">
//                 Усього: {calculateTotalSum()} грн.
//               </p>
//               <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
//                 Оформити замовлення
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bucket;

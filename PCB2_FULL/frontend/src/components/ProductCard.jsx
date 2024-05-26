import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import HeartButton from './HeartButton/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getProductFromCookies,
} from '../redux/slices/recentlyViewed';

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cookies, setCookie] = useCookies(['recentlyViewed']);
  const dispatch = useDispatch();
  const recentlyViewedIds = useSelector((state) => state.recentlyViewed);

  useEffect(() => {
    dispatch(getProductFromCookies());
  }, [dispatch]);

  const handleViewProduct = () => {
    dispatch(addProduct(props.id));
    const updatedRecentlyViewed = [...recentlyViewedIds, props.id];
    setCookie('recentlyViewed', updatedRecentlyViewed, { path: '/' });
  };

  const toggleHover = () => {
    setIsHovered((prevState) => !prevState);
  };

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg overflow-hidden p-2">
      <div
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="flex flex-1 max-w-[250px] flex-col w-full max-sm:w-full"
      >
        <div className="relative">
          <img
            src={`http://127.0.0.1:5000/${props.image}`}
            alt={props.title}
            className="w-[250px] h-[250px] rounded-md"
          />
          {isHovered && (
            <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
              <HeartButton productId={props.id} />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col justify-start gap-2.5">
          <Link
            to={`/product/${props.id}`}
            className="mt-2 text-xl leading-normal font-semibold font-palanquin"
            onClick={handleViewProduct}
          >
            {props.title}
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {props.rating ? (
                <>
                  <FaStar className="mr-1 text-coral-red" />
                  <p className="font-montserrat text-xl leading-normal text-slate-gray">
                    ({props.rating})
                  </p>
                </>
              ) : (
                <p className="font-montserrat text-xl leading-normal text-slate-gray">
                  Нема оцінок
                </p>
              )}
            </div>
            <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
              {props.price} грн.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import { useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import { FaStar } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// import HeartButton from './HeartButton/HeartButton';

// const ProductCard = (props) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [cookies, setCookie] = useCookies(['recentlyViewed']);
//   const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);

//   const toggleHover = () => {
//     setIsHovered((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const cookieValue = cookies.recentlyViewed;
//     if (cookieValue) {
//       setRecentlyViewedIds(JSON.parse(cookieValue));
//     }
//   }, []);
//   console.log('(recentlyViewedIds', recentlyViewedIds);

//   const handleViewProduct = () => {
//     const updatedIds = [...recentlyViewedIds, props.id];
//     const uniqueIds = [...new Set(updatedIds)].slice(-20);
//     setRecentlyViewedIds(uniqueIds);
//     setCookie('recentlyViewed', JSON.stringify(uniqueIds), {
//       maxAge: 3600 * 24 * 7,
//     });
//   };

//   return (
//     <div className="border border-gray-200 shadow-lg rounded-lg overflow-hidden p-2">
//       <div
//         onMouseEnter={toggleHover}
//         onMouseLeave={toggleHover}
//         className="flex flex-1 max-w-[250px] flex-col w-full max-sm:w-full"
//       >
//         <div className="relative">
//           <img
//             src={`http://127.0.0.1:5000/${props.image}`}
//             alt={props.title}
//             className="w-[250px] h-[250px] rounded-md"
//           />
//           {isHovered && (
//             <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
//               <HeartButton productId={props.id} />
//             </div>
//           )}
//         </div>

//         <div className="mt-4 flex flex-col justify-start gap-2.5">
//           <Link
//             to={`/product/${props.id}`}
//             className="mt-2 text-xl leading-normal font-semibold font-palanquin"
//             onClick={handleViewProduct}
//           >
//             {props.title}
//           </Link>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               {props.rating ? (
//                 <>
//                   <FaStar className="mr-1 text-coral-red" />
//                   <p className="font-montserrat text-xl leading-normal text-slate-gray">
//                     ({props.rating})
//                   </p>
//                 </>
//               ) : (
//                 <p className="font-montserrat text-xl leading-normal text-slate-gray">
//                   Нема оцінок
//                 </p>
//               )}
//             </div>
//             <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
//               {props.price} грн.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// const ProductCard = ({ photo, title, price, description }) => {
//   const shortDescription =
//     description.length > 48 ? description.slice(0, 48) + '...' : description;

//   return (
//     <div className="flex flex-1 max-w-[290px] flex-col w-full max-sm:w-full">
//       <div className="relative">
//         <img
//           src={photo}
//           alt={title}
//           className="w-[290px] h-[290px] rounded-md"
//         />
//         <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
//           <FaRegHeart className="w-6 h-5 mr-1 text-red-600 absolute left-2 top-1/4" />
//         </div>
//       </div>
//       <div className="mt-4 flex flex-col justify-start gap-2.5">
//         <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
//           {title}
//         </h3>
//         <p className="font-montserrat text-xl leading-normal text-slate-gray">
//           {shortDescription}
//         </p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <FaStar className="mr-1 text-coral-red" />
//             <p className="font-montserrat text-xl leading-normal text-slate-gray">
//               (4.5)
//             </p>
//           </div>
//           <div className="flex items-center pr-1">
//             <GiTwoCoins className="mr-1 text-yellow-500" />
//             <p className="mt-1 font-semibold font-montserrat  leading-normal">
//               10 грн.
//             </p>
//           </div>
//         </div>
//       </div>
//       <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
//         {price} грн.
//       </p>
//     </div>
//   );
// };

// export default ProductCard;

// const ProductCard = ({ photo, title, price, description }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const toggleHover = () => {
//     setIsHovered(!isHovered);
//   };

//   return (
//     <div className="flex flex-1 max-w-[290px] flex-col w-full max-sm:w-full">
//       <div className="relative">
//         <img
//           src={photo}
//           alt={title}
//           className="w-[290px] h-[290px] rounded-md"
//         />
//         <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
//           <FaRegHeart className="w-6 h-5 mr-1 text-red-600 absolute left-2 top-1/4" />
//         </div>
//       </div>
//       <div
//         onMouseEnter={toggleHover}
//         onMouseLeave={toggleHover}
//         className="mt-4 flex flex-col justify-start gap-2.5"
//       >
//         <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
//           {title}
//         </h3>
//         <p
//           className={`font-montserrat text-xl leading-normal text-slate-gray ${
//             isHovered ? 'whitespace-normal' : 'truncate'
//           }`}
//         >
//           {description}
//         </p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <FaStar className="mr-1 text-coral-red" />
//             <p className="font-montserrat text-xl leading-normal text-slate-gray">
//               (4.5)
//             </p>
//           </div>
//           <div className="flex items-center pr-1">
//             <GiTwoCoins className="mr-1 text-yellow-500" />
//             <p className="mt-1 font-semibold font-montserrat  leading-normal">
//               10 грн.
//             </p>
//           </div>
//         </div>
//       </div>
//       <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
//         {price} грн.
//       </p>
//     </div>
//   );
// };

// export default ProductCard;

//----------------------------------------------------------------------------------------------

// const ProductCard = ({ photo, title, price, description }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const shortDescription =
//     description.length > 48 ? description.slice(0, 48) + '...' : description;

//   const toggleHover = () => {
//     setIsHovered(!isHovered);
//   };

//   return (
//     <div>
//       <Link
//         // href={`/product/${slug.current}`}
//         href={`/product/`}
//         onMouseEnter={toggleHover}
//         onMouseLeave={toggleHover}
//         className="flex flex-1 max-w-[290px] flex-col w-full max-sm:w-full"
//       >
//         <div className="relative">
//           <img
//             src={photo}
//             alt={title}
//             className="w-[290px] h-[290px] rounded-md"
//           />
//           {isHovered && (
//             <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
//               <FaRegHeart className="w-6 h-5 mr-1 text-red-600 absolute left-2 top-1/4" />
//             </div>
//           )}
//         </div>
//         <div className="mt-4 flex flex-col justify-start gap-2.5">
//           <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
//             {title}
//           </h3>
//           <p
//             className={'font-montserrat text-xl leading-normal text-slate-gray'}
//           >
//             {/* {isHovered ? description : shortDescription} */}
//             {shortDescription}
//           </p>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FaStar className="mr-1 text-coral-red" />
//               <p className="font-montserrat text-xl leading-normal text-slate-gray">
//                 (4.5)
//               </p>
//             </div>
//             {/* <div className="flex items-center pr-1">
//               <GiTwoCoins className="mr-1 text-yellow-500" />
//               <p className="mt-1 font-semibold font-montserrat  leading-normal">
//                 10 грн.
//               </p>
//             </div> */}

//             <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
//               {price} грн.
//             </p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;
//----------------------------------------------------------------------------------------------

// const ProductCard = ({ photo, title, price, description }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const shortDescription =
//     description.length > 48 ? description.slice(0, 48) + '...' : description;

//   const toggleHover = () => {
//     setIsHovered(!isHovered);
//   };

//   return (
//     <div>
//       <Link
//         // href={`/product/${slug.current}`}
//         href={`/product/`}
//         onMouseEnter={toggleHover}
//         onMouseLeave={toggleHover}
//         className="flex flex-1 max-w-[250px] flex-col w-full max-sm:w-full"
//       >
//         <div className="relative">
//           <img
//             src={photo}
//             alt={title}
//             className="w-[250px] h-[250px] rounded-md"
//           />
//           {isHovered && (
//             <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
//               <FaRegHeart className="w-6 h-5 mr-1 text-red-600 absolute left-2 top-1/4" />
//             </div>
//           )}
//         </div>
//         <div className="mt-4 flex flex-col justify-start gap-2.5">
//           <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
//             {title}
//           </h3>
//           <p
//             className={'font-montserrat text-xl leading-normal text-slate-gray'}
//           >
//             {/* {isHovered ? description : shortDescription} */}
//             {shortDescription}
//           </p>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FaStar className="mr-1 text-coral-red" />
//               <p className="font-montserrat text-xl leading-normal text-slate-gray">
//                 (4.5)
//               </p>
//             </div>
//             {/* <div className="flex items-center pr-1">
//               <GiTwoCoins className="mr-1 text-yellow-500" />
//               <p className="mt-1 font-semibold font-montserrat  leading-normal">
//                 10 грн.
//               </p>
//             </div> */}

//             <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
//               {price} грн.
//             </p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

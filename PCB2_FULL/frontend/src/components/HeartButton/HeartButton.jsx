import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { isLoggedIn } from '../../services/AuthService';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
  selectFavoriteProducts,
  sendFavoriteProduct,
} from '../../redux/slices/favoriteProductSlice';
import Modal from './Modal';

const HeartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favoriteProducts.includes(productId)
  );

  const handleClick = () => {
    // console.log('isLoggedIn', isLoggedIn);
    if (!localStorage.getItem('accessToken')) {
      setShowModal(true);
      return;
    }

    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    if (isFavorite) {
      dispatch(removeFavoriteProduct(productId));
    } else {
      dispatch(addFavoriteProduct(productId));
    }
    dispatch(sendFavoriteProduct(productId));
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-8 h-6 text-red-600 absolute left-1/4 top-1/4"
      >
        {isFavorite ? (
          <FaHeart color="red" size={20} />
        ) : (
          <FaRegHeart size={20} />
        )}
      </button>
      {showModal && (
        <Modal>
          <div className="relative">
            <div className="text-center p-8">
              <p className="mb-4">
                Будь ласка, увійдіть до свого облікового запису, щоб додати
                товар до улюбленого.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                <a href="/sign-in">Войти</a>
              </button>
              <button
                className="absolute top-0 right-0"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HeartButton;

// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import {
//   addFavoriteProduct,
//   removeFavoriteProduct,
//   selectFavoriteProducts,
//   sendFavoriteProduct,
// } from '../redux/slices/favoriteProductSlice';

// const HeartButton = ({ productId }) => {
//   const dispatch = useDispatch();
//   const favoriteProducts = useSelector(selectFavoriteProducts);
//   const [isFavorite, setIsFavorite] = useState(
//     favoriteProducts.includes(productId)
//   );

//   const handleClick = () => {
//     const newIsFavorite = !isFavorite;
//     setIsFavorite(newIsFavorite);
//     if (isFavorite) {
//       dispatch(removeFavoriteProduct(productId));
//     } else {
//       dispatch(addFavoriteProduct(productId));
//     }
//     dispatch(sendFavoriteProduct(productId));
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-8 h-6 text-red-600 absolute left-1/4 top-1/4"
//     >
//       {isFavorite ? (
//         <FaHeart color="red" size={20} />
//       ) : (
//         <FaRegHeart size={20} />
//       )}
//     </button>
//   );
// };

// export default HeartButton;

// import { useState } from 'react';
// import { FaHeart } from 'react-icons/fa';

// const HeartButton = ({ productId, topVal, rightVal }) => {
//   const [isLiked, setIsLiked] = useState(false);

//   const handleToggleLike = () => {
//     const likedProducts =
//       JSON.parse(localStorage.getItem('likedProducts')) || [];

//     if (isLiked) {
//       // Удалить товар из списка "Любимое"
//       const updatedLikedProducts = likedProducts.filter(
//         (id) => id !== productId
//       );
//       localStorage.setItem(
//         'likedProducts',
//         JSON.stringify(updatedLikedProducts)
//       );
//     } else {
//       // Добавить товар в список "Любимое"
//       const updatedLikedProducts = [...likedProducts, productId];
//       localStorage.setItem(
//         'likedProducts',
//         JSON.stringify(updatedLikedProducts)
//       );
//     }

//     setIsLiked(!isLiked);
//   };

//   return (
//     <div className="relative">
//       <div className="absolute top-[30px] right-[40px] transform translate-x-1/2 -translate-y-1/2 bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
//         <button
//           className={`transition-colors duration-300 ease-in-out ${
//             isLiked ? 'text-red-500' : 'text-gray-300'
//           }`}
//           onClick={handleToggleLike}
//         >
//           <FaHeart size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HeartButton;

import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import UserService from '../services/UserService';
import { API_URL } from '../http';

const UserButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageData, setImageData] = useState(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageData = await UserService.getImage();
        setImageData(imageData);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  const renderUserIcon = () => {
    if (isAuthenticated) {
      return (
        <img
          src={API_URL + imageData}
          alt="User"
          className="w-[25px] h-[25px] rounded-full"
        />
      );
    } else {
      return <FaUser className="w-[25px] h-[25px]" />;
    }
  };

  return (
    <div className="relative">
      <button onClick={togglePopup}>{renderUserIcon()}</button>

      {isPopupOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-md rounded-md">
          <div className="relative">
            <div className="absolute top-0 right-4 w-4 h-4 bg-white transform rotate-45 -mt-1 "></div>
          </div>
          <Link
            to="/my-account"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Мій Аккаунт
          </Link>
          <Link
            to="/wishlist"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Список Улюбленого
          </Link>
          {!isAuthenticated && ( // Показать только если пользователь не аутентифицирован
            <>
              <Link
                to="/create-account"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Створити Аккаунт
              </Link>
              <Link
                to="/sign-in"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Увійти
              </Link>
            </>
          )}
          {isAuthenticated && ( // Показать только если пользователь аутентифицирован
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Вийти
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserButton;

//   return (
//     <div className="relative">
//       <button onClick={togglePopup}>
//         <CiUser className="w-[30px] h-[30px]" />
//       </button>

//       {isPopupOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-md rounded-md">
//           <div className="relative">
//             <div className="absolute top-0 right-4 w-4 h-4 bg-white transform rotate-45 -mt-1 "></div>
//           </div>
//           <Link
//             to="/my-account"
//             className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//           >
//             Мій Аккаунт
//           </Link>
//           <Link
//             to="/wishlist"
//             className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//           >
//             Список Улюбленого
//           </Link>
//           <Link
//             to="/create-account"
//             className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//           >
//             Створити Аккаунт
//           </Link>
//           <Link
//             to="/sign-in"
//             className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//           >
//             Увійти
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserButton;

import { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const UserButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      <button onClick={togglePopup}>
        <CiUser className="w-[30px] h-[30px]" />
      </button>

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
        </div>
      )}
    </div>
  );
};

export default UserButton;

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const HeartButton = ({ productId, topVal, rightVal }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    const likedProducts =
      JSON.parse(localStorage.getItem('likedProducts')) || [];

    if (isLiked) {
      // Удалить товар из списка "Любимое"
      const updatedLikedProducts = likedProducts.filter(
        (id) => id !== productId
      );
      localStorage.setItem(
        'likedProducts',
        JSON.stringify(updatedLikedProducts)
      );
    } else {
      // Добавить товар в список "Любимое"
      const updatedLikedProducts = [...likedProducts, productId];
      localStorage.setItem(
        'likedProducts',
        JSON.stringify(updatedLikedProducts)
      );
    }

    setIsLiked(!isLiked);
  };

  return (
    <div className="relative">
      <div className="absolute top-[30px] right-[40px] transform translate-x-1/2 -translate-y-1/2 bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
        <button
          className={`transition-colors duration-300 ease-in-out ${
            isLiked ? 'text-red-500' : 'text-gray-300'
          }`}
          onClick={handleToggleLike}
        >
          <FaHeart size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeartButton;

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import StarRating from './StarRating';

const WriteComment = ({ closeModal }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    // Обработка отправки комментария
    // Здесь можно добавить код для сохранения данных на сервере или в state
    console.log('Rating:', rating, 'Comment:', comment);
    closeModal(); // Закрыть модальное окно после отправки
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Написати відгук</h2>
        <div className="flex items-center gap-2">
          <h3>Яку оцінку можете дати?</h3>
          <StarRating
            count={5}
            currentRating={rating}
            setRating={handleRating}
          />
        </div>

        <textarea
          className="w-full p-2 border border-gr ay-300 rounded mt-4"
          placeholder="Введіть ваш коментар"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Отменить
          </button>
          <button
            className="bg-main-orange  hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;

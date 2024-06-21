import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-200">
      <h1 className="text-4xl font-bold text-orange-700 mb-4">
        Упс! Сторінка не знайдена
      </h1>
      <p className="text-lg text-orange-600">
        Схоже, що ви потрапили не туди, куди хотіли.
      </p>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => navigate('/')}
      >
        Повернутись на головну
      </button>
    </div>
  );
};

export default NotFoundPage;

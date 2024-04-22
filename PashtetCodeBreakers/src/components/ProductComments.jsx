import { RatingStats, DisplayStarRating } from './index.js';

const ProductComments = ({ productName, comments, toggleWriteComent }) => {
  return (
    <div className="max-w-[1440px] m-auto">
      <div className="flex p-8 gap-12 max-sm:flex-col">
        <div className="w-[40%] max-sm:w-[100%] pr-4">
          <h2 className="font-bold text-xl mb-2">Рейтинг клієнтів</h2>
          <div className="h-[2px] w-[160px] bg-yellow-500 rounded-sm mb-4"></div>
          <div className="flex gap-2 mb-2">
            <DisplayStarRating rating={4} size={24} />
            <p>Оцінка {4.3} з 5</p>
          </div>
          <RatingStats ratings={[5, 3, 2, 1, 4]} />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            onClick={toggleWriteComent}
          >
            Написати відгук
          </button>
        </div>
        <div className="w-[60%] max-sm:w-[100%] overflow-y-auto">
          <h2 className="font-bold text-xl mb-4">{productName}</h2>
          {comments.map((comment, index) => (
            <div key={index} className="flex mb-4">
              <div className="w-1/6 mr-4 flex items-center justify-center">
                <img
                  src={comment.avatar}
                  alt={`Аватар пользователя ${index}`}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="w-5/6">
                <div className="flex items-center mb-2">
                  <DisplayStarRating rating={comment.rating} size={16} />
                  <span className="ml-2">{comment.date}</span>
                </div>
                <p>{comment.text}</p>
                <div className="flex mt-2">
                  <button className="mr-2 border p-1">Like</button>
                  <button className="border p-1">Dislike</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComments;

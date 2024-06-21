import { RatingStats, DisplayStarRating } from './index.js';
import { API_URL } from '../http/index.js';
import { FaRegCommentDots } from 'react-icons/fa';

const ProductComments = ({
  productName,
  comments,
  rating,
  ratingInfo,
  toggleWriteComent,
}) => {
  const ratingsArray = Array(5)
    .fill(0)
    .map((_, index) => ratingInfo[5 - index] || 0);
  const totalRatings = ratingsArray.reduce((sum, count) => sum + count, 0);

  return (
    <div className="max-w-[1440px] m-auto">
      <div className="flex p-8 gap-12 max-sm:flex-col">
        <div className="w-[40%] max-sm:w-[100%] pr-4">
          <h2 className="font-bold text-xl mb-2">Рейтинг клієнтів</h2>
          <div className="h-[2px] w-[160px] bg-yellow-500 rounded-sm mb-4"></div>
          <div className="flex gap-2 mb-2">
            <DisplayStarRating rating={rating} size={24} />
            {rating && <p>Оцінка {rating} з 5</p>}
          </div>
          <RatingStats ratings={ratingsArray} totalRatings={totalRatings} />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            onClick={toggleWriteComent}
          >
            Написати відгук
          </button>
        </div>
        <div className="w-[60%] max-sm:w-[100%] overflow-y-auto max-h-[400px]">
          <h2 className="font-bold text-xl mb-4">{productName}</h2>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex mb-4">
                <div className="w-1/8 mr-4 flex flex-col items-start  gap-4">
                  <img
                    src={API_URL + comment.user_image}
                    alt={`Аватар юзера ${index}`}
                    className="max-w-12 h-12 rounded-full object-cover"
                  />
                </div>

                <div className="w-7/8">
                  <div className="font-bold">{comment.user_name}</div>
                  <div className="flex items-center mb-2">
                    <span className="mr-2 text-xs">{comment.created_at}</span>
                    <DisplayStarRating rating={comment.grade} size={16} />
                  </div>
                  <p>{comment.text}</p>
                  {/* <div className="flex mt-2">
                    <button className="mr-2 border p-1">Like</button>
                    <button className="border p-1">Dislike</button>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <FaRegCommentDots size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-500 text-lg">
                Коментарів ще нема. Будьте першим!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComments;

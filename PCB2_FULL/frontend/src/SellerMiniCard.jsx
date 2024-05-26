import { API_URL } from './http';
import DisplayStarRating from './components/DisplayStarRating';

const SellerMiniCard = ({ product_owner }) => {
  return (
    <div className="flex items-center bg-white p-4 shadow-md rounded-lg gap-4">
      <div className="w-20 h-20 overflow-hidden rounded-full">
        <img
          src={API_URL + product_owner.profile_image}
          alt="Seller Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">
          {product_owner.name} {product_owner.surname}
        </h2>
        <p className="text-gray-600">Продавець</p>
        <div className="flex items-center">
          <DisplayStarRating rating={3} size={20} />
          <button className="ml-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 font-bold text-white rounded-md transition duration-200">
            Зв'язатися
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerMiniCard;

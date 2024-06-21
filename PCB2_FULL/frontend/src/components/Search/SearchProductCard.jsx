import { Link } from 'react-router-dom';
import { API_URL } from '../../http';

const SearchProductCard = ({ product }) => {
  return (
    <div className="flex items-center gap-4 p-2 border-b">
      <img
        className="w-16 h-16 object-cover"
        src={`${API_URL}${product.image}`}
        alt={product.title}
      />
      <div className="flex-1">
        <Link to={`/product/${product.id}`} className="hover:underline">
          {product.title.length > 22
            ? product.title.slice(0, 22) + '...'
            : product.title}
        </Link>
        <div className="text-gray-500">{product.price} грн.</div>
      </div>
    </div>
  );
};

export default SearchProductCard;

import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { NoItemFound } from '../assets/icons';

const ProductListMainPage = ({ products, title, link }) => {
  const lastFourProducts = products.slice(-4).reverse();

  return (
    <div className="max-container px-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {products.length > 3 && (
          <Link to={link} className="hover:underline mb-4">
            Показати ще
          </Link>
        )}
      </div>
      {lastFourProducts.length === 0 ? (
        <div className="flex items-center justify-center w-[1000px] h-full">
          <div className="text-center">
            <img
              src={NoItemFound}
              alt="No items found"
              className="w-24 h-24 mx-auto mb-2"
            />
            <p className="text-gray-500">Поки тут нічого немає</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {lastFourProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListMainPage;

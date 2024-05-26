import { useState, useEffect } from 'react';
// import { FaStar } from 'react-icons/fa';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  const [showMore, setShowMore] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    if (products.length > 4) {
      setVisibleProducts(products.slice(0, 4));
    } else {
      setVisibleProducts(products);
    }
  }, [products]);

  const handleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      setVisibleProducts(products.slice(0, 4));
    } else {
      setVisibleProducts(products);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold mb-4">Товары</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {products.length > 4 && (
        <button
          className="mt-4 text-sm font-semibold text-coral-red"
          onClick={handleShowMore}
        >
          {showMore ? 'Показать меньше' : 'Показать больше'}
        </button>
      )}
    </div>
  );
};

export default ProductList;

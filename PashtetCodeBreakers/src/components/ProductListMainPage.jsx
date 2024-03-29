import ProductCard from './ProductCard';

const ProductListMainPage = ({ products, title }) => {
  const lastFourProducts = products.slice(-4);

  return (
    <div className="max-container px-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <a href="/" className="hover:underline mb-4">
          Показати ще
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lastFourProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListMainPage;

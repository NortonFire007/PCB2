// import ProductCard from '../ProductCard';

// const ProductList = ({ products }) => {
//   return (
//     <div className="max-w-[1200px] mx-auto px-5 pb-16">
//       <h2 className="text-2xl font-semibold mb-4">Товары</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
//         {products.map((product) => (
//           <ProductCard key={product.id} {...product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import ProductCard from '../ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-5 pb-16 ">
      <h2 className="text-2xl font-semibold mb-4">Товари</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <i className="fas fa-box-open text-8xl text-gray-400 mb-4"></i>
          <p className="text-gray-500">Нема товарів</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

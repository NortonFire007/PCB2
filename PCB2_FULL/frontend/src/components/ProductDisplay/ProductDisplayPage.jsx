import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductService from '../../services/ProductService';
import ProductDisplay from './ProductsDisplay';

const ProductDisplayPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');

  const recentlyViewedIds = useSelector((state) => state.recentlyViewed);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        const query = new URLSearchParams(location.search).get('query');

        if (query) {
          response = await ProductService.searchProducts(query);
          setTitle(`Результати пошуку для "${query}"`);
        } else if (category === 'new') {
          response = await ProductService.getNewProducts();
          setTitle('Нові товари');
        } else if (category === 'for-you') {
          response = await ProductService.getProductsForYou();
          setTitle('Для вас');
        } else if (category === 'recently-viewed') {
          const productsResponse = await ProductService.getProducts();
          const recentlyViewedProducts = productsResponse.data
            .filter((product) => recentlyViewedIds.includes(product.id))
            .sort(
              (a, b) =>
                recentlyViewedIds.indexOf(a.id) -
                recentlyViewedIds.indexOf(b.id)
            )
            .reverse();
          setTitle('Нещодавно переглянуті');
          setProducts(recentlyViewedProducts);
          return;
        }

        if (response) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category, location.search, recentlyViewedIds]);

  return <ProductDisplay products={products} title={title} />;
};

export default ProductDisplayPage;

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProductService from '../../services/ProductService';
// import ProductDisplay from './ProductsDisplay';

// const ProductDisplayPage = () => {
//   const { category } = useParams();
//   console.log('category', category);
//   const [products, setProducts] = useState([]);
//   const [title, setTitle] = useState('');

//   const recentlyViewedIds = useSelector((state) => state.recentlyViewed);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let response;
//         if (category === 'new') {
//           response = await ProductService.getNewProducts();
//           setTitle('Нові товари');
//         } else if (category === 'for-you') {
//           response = await ProductService.getProductsForYou();
//           setTitle('Для вас');
//         } else if (category === 'recently-viewed') {
//           const productsResponse = await ProductService.getProducts();
//           const recentlyViewedProducts = productsResponse.data
//             .filter((product) => recentlyViewedIds.includes(product.id))
//             .sort(
//               (a, b) =>
//                 recentlyViewedIds.indexOf(a.id) -
//                 recentlyViewedIds.indexOf(b.id)
//             )
//             .reverse();
//           setTitle('Нещодавно переглянуті');
//           setProducts(recentlyViewedProducts);
//           return;
//         }
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, [category, recentlyViewedIds]);

//   return <ProductDisplay products={products} title={title} />;
// };

// export default ProductDisplayPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../components';
import ProductDisplay from '../components/ProductDisplay/ProductsDisplay';
import {
  fetchFavoriteProducts,
  selectFavoriteProducts,
} from '../redux/slices/favoriteProductSlice';
import ProductService from '../services/ProductService';

const WishListPage = () => {
  const dispatch = useDispatch();
  const favoriteProductsIds = useSelector(selectFavoriteProducts);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await ProductService.getProducts();
        setProductList(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const favoriteProducts = productList.filter((product) =>
    favoriteProductsIds.includes(product.id)
  );

  return (
    <div className="container mx-auto ">
      <ProductDisplay products={favoriteProducts} title="Список Улюбленого" />
    </div>
  );
};

export default WishListPage;

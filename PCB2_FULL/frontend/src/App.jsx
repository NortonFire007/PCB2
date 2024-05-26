// import {
//   Nav,
//   Carousel,
//   CategoryList,
//   //ProductCard,
//   Footer,
//   ProductListMainPage,
// } from './components';

// import { products } from './constants';

// function App() {
//   return (
//     <main className="relative">
//       <section className="pb-32">
//         <Nav />
//       </section>
//       <section className="padding-b">
//         <Carousel />
//       </section>
//       <section className="padding-b">
//         <CategoryList />
//       </section>
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage products={products} title={'Нові товари'} />
//       </section>
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage products={products} title={'Для вас'} />
//       </section>
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage
//           products={products}
//           title={'Останні переглянуті'}
//         />
//       </section>
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage products={products} title={'Хіти продажів'} />
//       </section>
//       <section className=" bg-black">
//         <Footer />
//       </section>
//     </main>
//   );
// }

// export default App;

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/Mainpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductSinglePage from './pages/ProductSinglePage';
import WishListPage from './pages/WishListPage';
import UserPage from './pages/UserPage';
import CategoryPage from './pages/CategoryPage';
import { checkAuth } from './redux/slices/authSlice';
import { setUser } from './redux/slices/userSlice';
import AccountChangingForm from './components/AccountChangingForm';
import CreateProduct from './components/CreateProduct/CreateProduct';
import Error from './components/Error/Error';
import { fetchFavoriteProducts } from './redux/slices/favoriteProductSlice';
import ProductDisplayPage from './components/ProductDisplay/ProductDisplayPage';

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     dispatch(checkAuth());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('accessToken');
  if (localStorage.getItem('accessToken')) {
    dispatch(setUser({ accessToken, refreshToken }));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/sign-in" element={<LoginPage />}></Route>
        <Route path="/create-account" element={<RegisterPage />}></Route>
        <Route path="/product/:id" element={<ProductSinglePage />}></Route>
        <Route path="/wishlist" element={<WishListPage />}></Route>
        <Route path="/my-account" element={<UserPage />}></Route>
        <Route path="/filter" element={<CategoryPage />}></Route>
        <Route path="/create_product" element={<CreateProduct />}></Route>
        <Route path="/change_account" element={<AccountChangingForm />}></Route>
        <Route path="/products/:category" element={<ProductDisplayPage />} />
      </Routes>
      <Error />
    </Router>
  );
}

export default App;

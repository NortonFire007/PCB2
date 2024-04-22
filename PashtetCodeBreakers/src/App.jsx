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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/Mainpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductSinglePage from './pages/ProductSinglePage';
import WishListPage from './pages/WishListPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/sign-in" element={<LoginPage />}></Route>
        <Route path="/create-account" element={<RegisterPage />}></Route>
        <Route path="/product/deatail" element={<ProductSinglePage />}></Route>
        <Route path="/wishlist" element={<WishListPage />}></Route>
        <Route path="/my-account" element={<UserPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Nav,
  Carousel,
  CategoryList,
  Footer,
  ProductListMainPage,
} from '../components';
import ProductService from '../services/ProductService';

const MainPage = () => {
  const [productList, setProductList] = useState([]);
  const [productsForYou, setProductsForYou] = useState([]);
  const recentlyViewedIds = useSelector((state) => state.recentlyViewed);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await ProductService.getProducts();
        setProductList(productsResponse.data);

        const productsForYouResponse = await ProductService.getProductsForYou();
        setProductsForYou(productsForYouResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const recentlyViewedProducts = productList
    .filter((product) => recentlyViewedIds.includes(product.id))
    .sort(
      (a, b) =>
        recentlyViewedIds.indexOf(a.id) - recentlyViewedIds.indexOf(b.id)
    );

  console.log('recentlyViewedProducts', recentlyViewedProducts);

  return (
    <main className="relative">
      <section className="pb-32">
        <Nav />
      </section>
      <section className="padding-b">
        <Carousel />
      </section>
      <section className="padding-b">
        <CategoryList />
      </section>
      <section className="padding-b flex justify-center">
        <ProductListMainPage
          products={productList}
          title={'Нові товари'}
          link="/products/new"
        />
      </section>

      <section className="padding-b flex justify-center">
        <ProductListMainPage
          products={productsForYou}
          title={'Для вас'}
          link="/products/for-you"
        />
      </section>

      <section className="padding-b flex justify-center">
        <ProductListMainPage
          products={recentlyViewedProducts}
          title={'Нещодавно переглянуті'}
          link="/products/recently-viewed"
        />
      </section>

      <section className=" bg-black">
        <Footer />
      </section>
    </main>
  );
};

export default MainPage;
// import { useState, useEffect } from 'react';
// import {
//   Nav,
//   Carousel,
//   CategoryList,
//   //ProductCard,
//   Footer,
//   ProductListMainPage,
// } from '../components';

// import ProductService from '../services/ProductService';

// const MainPage = () => {
//   const [productList, setProductList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await ProductService.getProducts();
//         console.log('response.data', response.data);
//         setProductList(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchData();
//   }, []);

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
//         <ProductListMainPage products={productList} title={'Нові товари'} />
//       </section>

//       <section className="padding-b flex justify-center">
//         <ProductListMainPage products={productsForYou} title={'Для вас'} />
//       </section>
//       {/*
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage
//           products={products}
//           title={'Останні переглянуті'}
//         />
//       </section>
//       <section className="padding-b flex justify-center">
//         <ProductListMainPage products={products} title={'Хіти продажів'} />
//       </section> */}
//       <section className=" bg-black">
//         <Footer />
//       </section>
//     </main>
//   );
// };

// export default MainPage;

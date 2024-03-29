import {
  Nav,
  Carousel,
  CategoryList,
  //ProductCard,
  Footer,
  ProductListMainPage,
} from './components';
import { products } from './constants';

function App() {
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
        <ProductListMainPage products={products} title={'Нові товари'} />
      </section>
      <section className="padding-b flex justify-center">
        <ProductListMainPage products={products} title={'Для вас'} />
      </section>
      <section className="padding-b flex justify-center">
        <ProductListMainPage
          products={products}
          title={'Останні переглянуті'}
        />
      </section>
      <section className="padding-b flex justify-center">
        <ProductListMainPage products={products} title={'Хіти продажів'} />
      </section>
      <section className=" bg-black">
        <Footer />
      </section>
    </main>
  );
}

export default App;

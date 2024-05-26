import { useState } from 'react';
import ProductList from '../CategoryPage/ProductList';
import Pagination from '../CategoryPage/Pagination';
import Nav from '../Nav';
import Footer from '../Footer';

const ProductDisplay = ({ products, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="pb-16">
        <Nav />
      </section>
      <section className="container mx-auto px-4 pb-16">
        {title && (
          <h1 className="text-3xl font-bold text-center my-8">{title}</h1>
        )}
        <ProductList products={currentProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default ProductDisplay;

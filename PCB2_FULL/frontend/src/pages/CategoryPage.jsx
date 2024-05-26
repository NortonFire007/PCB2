import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/CategoryPage/ProductList';
import Pagination from '../components/CategoryPage/Pagination';
import { Nav, Footer } from '../components';
import Filter from '../components/CategoryPage/Filter';
import axios from 'axios';

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category_id') || 'Всі',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    order: searchParams.get('order') || '',
  });
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        ...filters,
        page: currentPage,
        limit: productsPerPage,
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === 'null' || params[key] === null) {
          delete params[key];
        }
      });

      const response = await axios.get(
        'http://127.0.0.1:5000/products/search',
        { params }
      );
      setProducts(response.data);
    };

    fetchProducts();
  }, [filters, currentPage]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));

    const updatedSearchParams = new URLSearchParams(
      Object.entries({
        ...Object.fromEntries(searchParams),
        ...newFilters,
      }).filter(([_, value]) => !!value)
    );

    setSearchParams(updatedSearchParams);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <main>
      <section className="pb-32">
        <Nav />
      </section>
      <section className="flex gap-4 pb-32 max-w-7xl mx-auto">
        <aside className="w-1/5">
          <Filter
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </aside>
        <div className="w-4/5">
          <ProductList products={currentProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default CategoryPage;

// import { useState, useEffect } from 'react';
// import ProductList from '../components/CategoryPage/ProductList';
// import Pagination from '../components/CategoryPage/Pagination';
// import { Nav, Footer } from '../components';
// import Filter from '../components/CategoryPage/Filter';
// import axios from 'axios';

// const CategoryPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({});
//   const productsPerPage = 20;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await axios.get(
//         'http://127.0.0.1:5000/products/search',
//         { params: { ...filters, page: currentPage, limit: productsPerPage } }
//       );
//       setProducts(response.data);
//     };

//     fetchProducts();
//   }, [filters, currentPage]);

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   return (
//     <main>
//       <section className="pb-32">
//         <Nav />
//       </section>
//       <section className="flex gap-4 pb-32 max-w-7xl mx-auto">
//         <aside className="w-1/5">
//           <Filter onFilterChange={handleFilterChange} />
//         </aside>
//         <div className="w-4/5">
//           <ProductList products={currentProducts} />
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={onPageChange}
//           />
//         </div>
//       </section>
//       <section>
//         <Footer />
//       </section>
//     </main>
//   );
// };

// export default CategoryPage;

// import { useState, useEffect } from 'react';
// import ProductList from '../components/CategoryPage/ProductList';
// import Pagination from '../components/CategoryPage/Pagination';
// import { Nav, Footer } from '../components';
// import Filter from '../components/CategoryPage/Filter';
// import axios from 'axios';

// const CategoryPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({});
//   const productsPerPage = 20;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await axios.get(
//         'http://127.0.0.1:5000/products/search',
//         { params: filters }
//       );
//       setProducts(response.data);
//     };

//     fetchProducts();
//   }, [filters]);

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleFilterChange = (newFilters) => {
//     const transformedFilters = {};

//     if (newFilters.category && newFilters.category !== 'All') {
//       transformedFilters.category_id = getCategoryID(newFilters.category);
//     }

//     if (newFilters.price && newFilters.price !== 'All') {
//       const [minPrice, maxPrice] = newFilters.price
//         .split(' - ')
//         .map((price) => parseInt(price.replace('$', '')));
//       if (minPrice) transformedFilters.min_price = minPrice;
//       if (maxPrice) transformedFilters.max_price = maxPrice;
//     }

//     if (newFilters.popularity && newFilters.popularity !== 'All') {
//       transformedFilters.order = 'popularity';
//     }

//     setFilters((prevFilters) => ({ ...prevFilters, ...transformedFilters }));
//   };

//   const getCategoryID = (categoryName) => {
//     const categories = {
//       Біжутерія: 1,
//       'Інтер’єр та декор': 2,
//       'Подарункові набори': 3,
//       'Текстильні вироби': 4,
//       'Кераміка та фарфор': 5,
//       'Косметика та мило': 6,
//       Мистецтво: 7,
//       'Одяг та аксесуари': 8,
//     };

//     return categories[categoryName] || null;
//   };

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   return (
//     <main>
//       <section className="pb-32">
//         <Nav />
//       </section>
//       <section className="flex gap-4 pb-32 max-w-7xl mx-auto">
//         <aside className="w-1/5">
//           <Filter onFilterChange={handleFilterChange} />
//         </aside>
//         <div className="w-4/5">
//           <ProductList products={currentProducts} />
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={onPageChange}
//           />
//         </div>
//       </section>
//       <section>
//         <Footer />
//       </section>
//     </main>
//   );
// };

// export default CategoryPage;

// import ProductList from '../components/CategoryPage/ProductList';
// import Pagination from '../components/CategoryPage/Pagination';
// import { Nav, Footer } from '../components';
// import { useState } from 'react';
// import { products } from '../constants';

// const CategoryPage = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 20;
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   if (!products || products.length === 0) {
//     return <div>No products available</div>;
//   }

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <main>
//       <section className="pb-32">
//         <Nav />
//       </section>
//       <section className="pb-32">
//         <ProductList products={currentProducts} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//         />
//       </section>
//       <section>
//         <Footer />
//       </section>
//     </main>
//   );
// };

// export default CategoryPage;

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProductList from '../components/CategoryPage/ProductList';
import Pagination from '../components/CategoryPage/Pagination';
import { Nav, Footer } from '../components';
import $api from '../http';
import { API_URL } from '../http';
import { toast } from 'react-toastify';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const productsPerPage = 8;
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.sub;

          const userResponse = await $api.get(`/user/${userId}`);
          setUser(userResponse.data);

          const productsResponse = await $api.get(`/products/user/${userId}`);
          setProducts(productsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);

      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.sub;

        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await $api.put(`/user/${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            toast.success('Profile image updated successfully');
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error updating profile image:', error);
          toast.error('Failed to update profile image');
        }
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="pb-32">
        <Nav />
      </section>
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-slate-50 rounded-lg shadow-lg p-8 mx-auto max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src={API_URL + user.profile_image}
              alt={`${user.name} ${user.surname}`}
              className="w-24 h-24 rounded-full mb-4 shadow-lg cursor-pointer"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {`${user.name} ${user.surname}`}
            </h1>
          </div>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-1">{user.city}</p>
            <p className="text-gray-600 mb-1">{user.email}</p>
            <p className="text-gray-600">{user.tel}</p>
          </div>
          <div className="h-px w-full bg-gray-300 mb-6"></div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/create_product"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              Додати новий товар
            </Link>
          </div>
        </div>

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

export default UserPage;

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import ProductList from '../components/CategoryPage/ProductList';
// import Pagination from '../components/CategoryPage/Pagination';
// import { Nav, Footer } from '../components';
// import $api from '../http';
// import { API_URL } from '../http';

// const UserPage = () => {
//   const [user, setUser] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//           const decoded = jwtDecode(token);
//           const userId = decoded.id;

//           // const userResponse = await $api.get(`/user/${userId}`);
//           const userResponse = await $api.get(`/user/2`);
//           setUser(userResponse.data);

//           // const productsResponse = await $api.get(`/products/user/${userId}`);
//           const productsResponse = await $api.get(`/products/user/2`);
//           setProducts(productsResponse.data);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const onPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <section className="pb-32">
//         <Nav />
//       </section>
//       <section className="container mx-auto px-4 pb-16">
//         <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-md">
//           <div className="flex flex-col items-center mb-6">
//             <img
//               src={API_URL + user.profile_image}
//               alt={`${user.name} ${user.surname}`}
//               className="w-24 h-24 rounded-full mb-4 shadow-lg"
//             />
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">
//               {`${user.name} ${user.surname}`}
//             </h1>
//           </div>
//           <div className="text-center mb-6">
//             <p className="text-gray-600 mb-1">{user.city}</p>
//             <p className="text-gray-600 mb-1">{user.email}</p>
//             <p className="text-gray-600">{user.tel}</p>
//           </div>
//           <div className="h-px w-full bg-gray-300 mb-6"></div>
//           <div className="flex justify-center space-x-4">
//             <Link
//               to="/create_product"
//               className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Додати новий товар
//             </Link>
//           </div>
//         </div>

//         <ProductList products={currentProducts} />
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//         />
//       </section>
//       {/* <section className="container mx-auto px-4 py-16">
//         <h2 className="text-2xl font-bold mb-8 text-center">
//           Оцінка та відгуки
//         </h2>
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <div className="flex items-center justify-center mb-8">
//             <span className="text-4xl font-bold mr-2">4.5</span>
//             <div className="flex items-center">
//               {[...Array(5)].map((star, index) => (
//                 <svg
//                   key={index}
//                   className={`w-8 h-8 ${
//                     index < 4.5 ? 'text-yellow-400' : 'text-gray-300'
//                   }`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M10 15l-6.16 3.73L5.7 10 .5 6.27 7.08 5.33 10 0l2.92 5.33L19.5 6.27 14.3 10l1.86 8.73L10 15z" />
//                 </svg>
//               ))}
//             </div>
//           </div>
//           <div className="max-w-3xl mx-auto">
//             <div className="mb-8">
//               <p className="font-bold text-lg mb-2">Иван Иванов</p>
//               <p className="text-gray-600">
//                 Отличный продавец! Товары соответствуют описанию.
//               </p>
//             </div>
//             <div className="mb-8">
//               <p className="font-bold text-lg mb-2">Анна Петрова</p>
//               <p className="text-gray-600">
//                 Быстрая доставка и хорошее качество товаров.
//               </p>
//             </div>
//             <div className="mb-8 border-b border-gray-300 pb-8">
//               <p className="font-bold text-lg mb-2">Александр Сидоров</p>
//               <p className="text-gray-600">
//                 Рекомендую этого продавца! Всё прошло гладко и без проблем.
//               </p>
//             </div>
//             <div className="text-center">
//               <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//                 Оставить отзыв
//               </button>
//             </div>
//           </div>
//         </div>
//       </section> */}
//       <section>
//         <Footer />
//       </section>
//     </>
//   );
// };

// export default UserPage;

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

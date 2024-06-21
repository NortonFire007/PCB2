import axios from 'axios';
import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import SelectField from './SelectField';
import InputField from './InputField';
import TextareaField from './TextareaField';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAsyncCategories,
  getAllCategories,
} from '../../redux/slices/categorySlice';
import { toast } from 'react-toastify';
import Nav from '../Nav';
import Footer from '../Footer';

const ProductForm = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const categories = useSelector(getAllCategories);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('1');
  const [productPrice, setProductPrice] = useState('');
  const [zsuPercent, setZsuPercent] = useState('');
  const [files, setFiles] = useState([]);
  const [resetUploader, setResetUploader] = useState(false);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  const transformedCategories = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  console.log('transformedCategories', transformedCategories);

  const percents = [
    { value: 5, label: '5%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
  ];

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductCategory('');
    setProductPrice('');
    setZsuPercent('');
    setFiles([]);
    setResetUploader(true); // Устанавливаем флаг для сброса загрузчика изображений
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    const jsonData = {
      title: productName,
      description: productDescription,
      category_id: parseInt(productCategory, 10),
      price: parseInt(productPrice, 10),
      zsu_price: Math.round(parseInt(productPrice, 10) * (zsuPercent / 100)),
    };

    console.log(jsonData);
    formData.append('data', JSON.stringify(jsonData));

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/products/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success('Product created successfully');
        resetForm();
      }
    } catch (error) {
      const errorMsg = error.response ? error.response.data : 'Network error';
      toast.error(`Failed to create product: ${errorMsg}`);
    }
  };

  return (
    <div>
      <section className="pb-16">
        <Nav />
      </section>
      <section className="w-full max-w-screen-md mx-auto mt-10 pb-16">
        <h1 className="font-bold text-2xl">Створення товару</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <InputField
            name="title"
            label="Назва товару"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextareaField
            name="description"
            label="Опис товару"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <ImageUploader
            setFiles={setFiles}
            resetUploader={resetUploader}
            setResetUploader={setResetUploader}
          />
          <div className="flex justify-between">
            <SelectField
              name="category_id"
              label="Категорія товару"
              options={transformedCategories}
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-1/2"
            />
            <InputField
              name="price"
              label="Ціна"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-1/2"
            />
            <SelectField
              name="zsu_percent"
              label="Відсоток на ЗСУ"
              options={percents}
              value={zsuPercent}
              onChange={(e) => setZsuPercent(e.target.value)}
              className="w-1/2"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Створити
          </button>
        </form>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ProductForm;

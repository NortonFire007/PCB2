import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCategories,
  fetchAsyncCategories,
} from '../../redux/slices/categorySlice';

const Filter = ({ onFilterChange, initialFilters }) => {
  const categories = useSelector(getAllCategories);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters.category || 0
  );
  const [minPrice, setMinPrice] = useState(initialFilters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || '');
  const [order, setOrder] = useState(initialFilters.order || '');

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('categories ---', categories);
    if (categories.length > 0) {
      console.log('Zahod');
      const category = categories.find(
        (cat) => cat.id == initialFilters.category
      );
      console.log('categorie---', category);
      handleCategoryChange(category || 'Всі');
    }
  }, [categories]);

  // const handleCategoryChange = useCallback((category) => {
  //   setSelectedCategory(category.id);
  //   onFilterChange({ category_id: category === 'Всі' ? null : category.id });
  // }, []);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.id);
    onFilterChange({ category_id: category === 'Всі' ? null : category.id });
  };

  const handlePriceChange = (reset = false) => {
    if (reset) {
      setMinPrice('');
      setMaxPrice('');
      onFilterChange({ min_price: '', max_price: '' });
    } else {
      const updatedFilters = {};
      if (minPrice) updatedFilters.min_price = minPrice;
      if (maxPrice) updatedFilters.max_price = maxPrice;
      onFilterChange(updatedFilters);
    }
  };

  const handleOrderChange = (orderOption) => {
    setOrder(orderOption);
    onFilterChange({ order: orderOption === 'Всі' ? '' : orderOption });
  };

  console.log('selectedCategory ', selectedCategory);
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h3 className="font-bold text-lg mb-2">Категорія</h3>
      <div className="mb-4">
        {['Всі', ...categories].map((category) => (
          <div key={category.id || 0} className="mb-1">
            <input
              type="radio"
              id={category.title || 'Всі'}
              name="category"
              value={category.title || 'Всі'}
              checked={
                selectedCategory == category.id ||
                (selectedCategory == 0 && category.title == 'Всі')
              }
              onChange={() => handleCategoryChange(category)}
              className="mr-2"
            />
            <label htmlFor={category.title || 'Всі'} className="text-sm">
              {category.title || 'Всі'}
            </label>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-lg mb-2">Сортувати за:</h3>
      <div className="mb-4">
        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value)}
        >
          <option value="Всі">Вибрати порядок</option>
          <option value="-rating">За рейтингом</option>
          <option value="price">Від дешевих до дорогих</option>
          <option value="-price">Від дорогих до дешевих</option>
          <option value="-novelty">Новинки</option>
        </select>
      </div>

      <h3 className="font-bold text-lg mb-2">Ціна</h3>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 p-1 rounded w-full"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 p-1 rounded w-full"
          />
        </div>
        <button
          onClick={() => handlePriceChange()}
          className="bg-orange-400 text-white p-1 rounded w-full"
        >
          OK
        </button>
        <button
          onClick={() => handlePriceChange(true)}
          className="bg-gray-300 text-black p-1 rounded w-full mt-2"
        >
          Скинути Ціну
        </button>
      </div>
    </div>
  );
};

export default Filter;

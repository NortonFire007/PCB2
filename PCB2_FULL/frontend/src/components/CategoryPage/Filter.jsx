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
    if (categories.length > 0) {
      console.log('Zahod');
      const category = categories.find(
        (cat) => cat.id == initialFilters.category
      );
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

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getAllCategories,
//   fetchAsyncCategories,
// } from '../../redux/slices/categorySlice';

// const Filter = ({ onFilterChange, initialFilters }) => {
//   console.log('initialFilters', initialFilters);
//   const categories = useSelector(getAllCategories);
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState(
//     initialFilters.category || 'Всі'
//   );
//   console.log('selectedCategory', selectedCategory);
//   const [minPrice, setMinPrice] = useState(initialFilters.min_price || '');
//   const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || '');
//   const [order, setOrder] = useState(initialFilters.order || '');

//   useEffect(() => {
//     dispatch(fetchAsyncCategories());
//   }, [dispatch]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     onFilterChange({ category_id: category === 'Всі' ? null : category.id });
//   };

//   const handlePriceChange = (reset = false) => {
//     if (reset) {
//       setMinPrice('');
//       setMaxPrice('');
//       onFilterChange({ min_price: '', max_price: '' });
//     } else {
//       const updatedFilters = {};
//       if (minPrice) updatedFilters.min_price = minPrice;
//       if (maxPrice) updatedFilters.max_price = maxPrice;
//       onFilterChange(updatedFilters);
//     }
//   };

//   const handleOrderChange = (orderOption) => {
//     setOrder(orderOption);
//     onFilterChange({ order: orderOption === 'Всі' ? '' : orderOption });
//   };

//   return (
//     <div className="p-4 bg-gray-50 rounded-md shadow-md">
//       <h3 className="font-bold text-lg mb-2">Категорія</h3>
//       <div className="mb-4">
//         {['Всі', ...categories].map((category) => (
//           <div key={category.id || 'Всі'} className="mb-1">
//             <input
//               type="radio"
//               id={category.title || 'Всі'}
//               name="category"
//               value={category.title || 'Всі'}
//               checked={selectedCategory.title === (category.title || 'Всі')}
//               onChange={() => handleCategoryChange(category)}
//               className="mr-2"
//             />
//             <label htmlFor={category.title || 'Всі'} className="text-sm">
//               {category.title || 'Всі'}
//             </label>
//           </div>
//         ))}
//       </div>

//       <h3 className="font-bold text-lg mb-2">Сортувати за:</h3>
//       <div className="mb-4">
//         <select
//           value={order}
//           onChange={(e) => handleOrderChange(e.target.value)}
//         >
//           <option value="Всі">Вибрати порядок</option>
//           <option value="-rating">За рейтингом</option>
//           <option value="price">Від дешевих до дорогих</option>
//           <option value="-price">Від дорогих до дешевих</option>
//           <option value="-novelty">Новинки</option>
//         </select>
//       </div>

//       <h3 className="font-bold text-lg mb-2">Ціна</h3>
//       <div className="mb-4 flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//           <span>-</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={() => handlePriceChange()}
//           className="bg-orange-400 text-white p-1 rounded w-full"
//         >
//           OK
//         </button>
//         <button
//           onClick={() => handlePriceChange(true)}
//           className="bg-gray-300 text-black p-1 rounded w-full mt-2"
//         >
//           Скинути Ціну
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filter;
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getAllCategories,
//   fetchAsyncCategories,
// } from '../../redux/slices/categorySlice';

// const Filter = ({ onFilterChange }) => {
//   const categories = useSelector(getAllCategories);
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState('Всі');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [order, setOrder] = useState('');

//   useEffect(() => {
//     dispatch(fetchAsyncCategories());
//   }, [dispatch]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     onFilterChange({ category_id: category === 'Всі' ? null : category.id });
//   };

//   const handlePriceChange = (reset = false) => {
//     if (reset) {
//       setMinPrice('');
//       setMaxPrice('');
//       onFilterChange({ min_price: null, max_price: null });
//     } else {
//       onFilterChange({ min_price: minPrice, max_price: maxPrice });
//     }
//   };

//   const handleOrderChange = (orderOption) => {
//     setOrder(orderOption);
//     onFilterChange({ order: orderOption === 'Всі' ? null : orderOption });
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md shadow-md">
//       <h3 className="font-bold text-lg mb-2">Категорія</h3>
//       <div className="mb-4">
//         {['Всі', ...categories].map((category) => (
//           <div key={category.id || 'Всі'} className="mb-1">
//             <input
//               type="radio"
//               id={category.title || 'Всі'}
//               name="category"
//               value={category.title || 'Всі'}
//               checked={selectedCategory === (category.title || 'Всі')}
//               onChange={() => handleCategoryChange(category)}
//               className="mr-2"
//             />
//             <label htmlFor={category.title || 'Всі'} className="text-sm">
//               {category.title || 'Всі'}
//             </label>
//           </div>
//         ))}
//       </div>

//       <h3 className="font-bold text-lg mb-2">Сортувати за:</h3>
//       <div className="mb-4">
//         <select
//           value={order}
//           onChange={(e) => handleOrderChange(e.target.value)}
//         >
//           <option value="Всі">Вибрати порядок</option>
//           <option value="-rating">За рейтингом</option>
//           <option value="price">Від дешевих до дорогих</option>
//           <option value="-price">Від дорогих до дешевих</option>
//           <option value="-novelty">Новинки</option>
//         </select>
//       </div>

//       <h3 className="font-bold text-lg mb-2">Ціна</h3>
//       <div className="mb-4 flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//           <span>-</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={() => handlePriceChange()}
//           className="bg-blue-500 text-white p-1 rounded w-full"
//         >
//           OK
//         </button>
//         <button
//           onClick={() => handlePriceChange(true)}
//           className="bg-gray-300 text-black p-1 rounded w-full mt-2"
//         >
//           Скинути Ціну
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getAllCategories,
//   fetchAsyncCategories,
// } from '../../redux/slices/categorySlice';

// const Filter = ({ onFilterChange }) => {
//   const categories = useSelector(getAllCategories);
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [order, setOrder] = useState('');

//   useEffect(() => {
//     dispatch(fetchAsyncCategories());
//   }, [dispatch]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     onFilterChange({ category_id: category.id });
//   };

//   const handlePriceChange = () => {
//     onFilterChange({ min_price: minPrice, max_price: maxPrice });
//   };

//   const handleOrderChange = (orderOption) => {
//     setOrder(orderOption);
//     onFilterChange({ order: orderOption });
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md shadow-md">
//       <h3 className="font-bold text-lg mb-2">Категорія</h3>
//       <div className="mb-4">
//         {categories.map((category) => (
//           <div key={category.id} className="mb-1">
//             <input
//               type="radio"
//               id={category.title}
//               name="category"
//               value={category.title}
//               checked={selectedCategory === category.id}
//               onChange={() => handleCategoryChange(category)}
//               className="mr-2"
//             />
//             <label htmlFor={category.title} className="text-sm">
//               {category.title}
//             </label>
//           </div>
//         ))}
//       </div>

//       <h3 className="font-bold text-lg mb-2">Ціна</h3>
//       <div className="mb-4 flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//           <span>-</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={handlePriceChange}
//           className="bg-blue-500 text-white p-1 rounded w-full"
//         >
//           OK
//         </button>
//       </div>

//       <h3 className="font-bold text-lg mb-2">Сортировка</h3>
//       <div className="mb-4">
//         <select onChange={(e) => handleOrderChange(e.target.value)}>
//           <option value="">Select Order</option>
//           <option value="rating">By Rating</option>
//           <option value="-rating">By Rating Descending</option>
//           <option value="price">By Price Ascending</option>
//           <option value="-price">By Price Descending</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getAllCategories,
//   fetchAsyncCategories,
// } from '../../redux/slices/categorySlice';

// const Filter = ({ onFilterChange }) => {
//   const categories = useSelector(getAllCategories);
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState('Всі');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [selectedPopularity, setSelectedPopularity] = useState('Всі');
//   const [selectedNovelty, setSelectedNovelty] = useState('Всі');

//   useEffect(() => {
//     dispatch(fetchAsyncCategories());
//   }, [dispatch]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     onFilterChange({ category });
//   };

//   const handlePriceChange = () => {
//     onFilterChange({ minPrice, maxPrice });
//   };

//   const handlePopularityChange = (popularity) => {
//     setSelectedPopularity(popularity);
//     onFilterChange({ popularity });
//   };

//   const handleNoveltyChange = (novelty) => {
//     setSelectedNovelty(novelty);
//     onFilterChange({ novelty });
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md shadow-md">
//       <h3 className="font-bold text-lg mb-2">Категорія</h3>
//       <div className="mb-4">
//         {['Всі', ...categories.map((category) => category.title)].map(
//           (category) => (
//             <div key={category} className="mb-1">
//               <input
//                 type="radio"
//                 id={category}
//                 name="category"
//                 value={category}
//                 checked={selectedCategory === category}
//                 onChange={() => handleCategoryChange(category)}
//                 className="mr-2"
//               />
//               <label htmlFor={category} className="text-sm">
//                 {category}
//               </label>
//             </div>
//           )
//         )}
//       </div>

//       <h3 className="font-bold text-lg mb-2">Ціна</h3>
//       <div className="mb-4 flex flex-col gap-2">
//         <div className="flex items-center gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//           <span>-</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           />
//         </div>
//         <button
//           onClick={handlePriceChange}
//           className="bg-blue-500 text-white p-1 rounded w-full"
//         >
//           OK
//         </button>
//       </div>

//       <h3 className="font-bold text-lg mb-2">Популярність</h3>
//       <div className="mb-4">
//         {['Всі', 'Самые популярные'].map((popularity) => (
//           <div key={popularity} className="mb-1">
//             <input
//               type="radio"
//               id={popularity}
//               name="popularity"
//               value={popularity}
//               checked={selectedPopularity === popularity}
//               onChange={() => handlePopularityChange(popularity)}
//               className="mr-2"
//             />
//             <label htmlFor={popularity} className="text-sm">
//               {popularity}
//             </label>
//           </div>
//         ))}
//       </div>

//       <h3 className="font-bold text-lg mb-2">Новизна</h3>
//       <div className="mb-4">
//         {['Всі', 'Новые', 'Старые'].map((novelty) => (
//           <div key={novelty} className="mb-1">
//             <input
//               type="radio"
//               id={novelty}
//               name="novelty"
//               value={novelty}
//               checked={selectedNovelty === novelty}
//               onChange={() => handleNoveltyChange(novelty)}
//               className="mr-2"
//             />
//             <label htmlFor={novelty} className="text-sm">
//               {novelty}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Filter;

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   getAllCategories,
//   fetchAsyncCategories,
// } from '../../redux/slices/categorySlice';

// const Filter = ({ onFilterChange }) => {
//   const categories = useSelector(getAllCategories);
//   const dispatch = useDispatch();
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedPrice, setSelectedPrice] = useState('All');
//   const [selectedPopularity, setSelectedPopularity] = useState('All');

//   useEffect(() => {
//     dispatch(fetchAsyncCategories());
//   }, [dispatch]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     onFilterChange({ category });
//   };

//   const handlePriceChange = (price) => {
//     setSelectedPrice(price);
//     onFilterChange({ price });
//   };

//   const handlePopularityChange = (popularity) => {
//     setSelectedPopularity(popularity);
//     onFilterChange({ popularity });
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md shadow-md">
//       <h3 className="font-bold text-lg mb-2">Категорія</h3>
//       <div className="mb-4">
//         {['All', ...categories.map((category) => category.title)].map(
//           (category) => (
//             <div key={category} className="mb-1">
//               <input
//                 type="radio"
//                 id={category}
//                 name="category"
//                 value={category}
//                 checked={selectedCategory === category}
//                 onChange={() => handleCategoryChange(category)}
//                 className="mr-2"
//               />
//               <label htmlFor={category} className="text-sm">
//                 {category}
//               </label>
//             </div>
//           )
//         )}
//       </div>
//       <h3 className="font-bold text-lg mb-2">Ціна</h3>
//       <div className="mb-4">
//         {['All', '$0 - $50', '$50 - $100', '$100 - $150', 'Over $150'].map(
//           (price) => (
//             <div key={price} className="mb-1">
//               <input
//                 type="radio"
//                 id={price}
//                 name="price"
//                 value={price}
//                 checked={selectedPrice === price}
//                 onChange={() => handlePriceChange(price)}
//                 className="mr-2"
//               />
//               <label htmlFor={price} className="text-sm">
//                 {price}
//               </label>
//             </div>
//           )
//         )}
//       </div>
//       <h3 className="font-bold text-lg mb-2">Популярність</h3>
//       <div className="mb-4">
//         {['All', 'Most Popular'].map((popularity) => (
//           <div key={popularity} className="mb-1">
//             <input
//               type="radio"
//               id={popularity}
//               name="popularity"
//               value={popularity}
//               checked={selectedPopularity === popularity}
//               onChange={() => handlePopularityChange(popularity)}
//               className="mr-2"
//             />
//             <label htmlFor={popularity} className="text-sm">
//               {popularity}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Filter;

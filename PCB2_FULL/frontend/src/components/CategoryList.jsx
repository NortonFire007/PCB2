import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from './CategoryItem';
import {
  fetchAsyncCategories,
  getAllCategories,
} from '../redux/slices/categorySlice';
import { API_URL } from '../http';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-wrap -mx-4">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            title={category.title}
            icon={API_URL + category.icon}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

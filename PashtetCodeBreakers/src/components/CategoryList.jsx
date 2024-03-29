import CategoryItem from './CategoryItem';
import { categories } from '../constants';

const CategoryList = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-wrap -mx-4">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            title={category.title}
            icon={category.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

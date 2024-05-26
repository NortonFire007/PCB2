import { Link } from 'react-router-dom';

const CategoryItem = ({ title, icon, categoryId }) => {
  return (
    <div className="text-center flex-grow">
      <Link to={`/filter?category_id=${categoryId}`} className="block">
        <div className="flex items-center justify-center">
          <img src={icon} alt={title} className="mr-2 w-6 h-6" />
          <p className="text-2xl font-bold hover:text-main-orange whitespace-nowrap">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;

// const CategoryItem = ({ title, icon }) => {
//   return (
//     <div className="text-center flex-grow">
//       <a href="#" className="block">
//         <div className="flex items-center justify-center">
//           <img src={icon} alt={title} className="mr-2 w-6 h-6" />
//           <p className="text-2xl font-bold hover:text-main-orange whitespace-nowrap">
//             {title}
//           </p>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default CategoryItem;

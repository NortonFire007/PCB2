// const CategoryItem = ({ title, icon }) => {
//   return (
//     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 ">
//       <a href="#" className="block text-center">
//         <div className="flex items-center justify-center">
//           <img src={icon} alt={title} className="mr-2 w-12 h-12" />
//           <p className="text-2xl font-bold hover:text-main-orange">{title}</p>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default CategoryItem;

const CategoryItem = ({ title, icon }) => {
  return (
    <div className="text-center flex-grow">
      <a href="#" className="block">
        <div className="flex items-center justify-center">
          <img src={icon} alt={title} className="mr-2 w-6 h-6" />
          <p className="text-2xl font-bold hover:text-main-orange whitespace-nowrap">
            {title}
          </p>
        </div>
      </a>
    </div>
  );
};

export default CategoryItem;

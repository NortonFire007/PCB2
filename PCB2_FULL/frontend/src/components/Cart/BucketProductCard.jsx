import { IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { API_URL } from '../../http';

const BucketProductCard = (props) => {
  return (
    <li className="h-[120px] flex gap-4 items-center border-b py-2">
      <img
        className="w-[80px] h-[80px]"
        src={API_URL + props.product.image}
        alt={props.product.title}
      />
      <div className="flex flex-1">
        <Link
          to={`/product/${props.product_id}`}
          className="hover:underline"
          onClick={props.closeBucket}
        >
          {props.product.title.length > 22
            ? props.product.title.slice(0, 22) + '...'
            : props.product.title}
        </Link>
      </div>
      <span className="font-bold">{props.price}грн.</span>

      <div className="flex  flex-col items-center justify-end">
        <button
          onClick={props.removeFromBucket}
          className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 rounded px-4 py-2 transition-colors"
        >
          <IoTrashOutline className="text-red-500" />
          <span className="hidden md:block">Видалити</span>
        </button>
      </div>
    </li>
  );
};

export default BucketProductCard;

// import { IoTrashOutline } from 'react-icons/io5';
// import { Link } from 'react-router-dom';

// const BucketProductCard = (props) => {
//   return (
//     <li className="h-[120px] flex gap-4 items-center border-b py-2">
//       <img className="w-[80px] h-[80px]" src={props.photo} alt={props.title} />
//       <div className="flex flex-1">
//         <Link to="/" className="hover:underline">
//           {props.title.length > 22
//             ? props.title.slice(0, 22) + '...'
//             : props.title}
//         </Link>
//       </div>
//       {/* <DisplayStarRating rating={props.rating} /> */}
//       <span className="font-bold">{props.price}грн.</span>

//       <div className="flex  flex-col items-center justify-end">
//         <button
//           onClick={props.removeFromBucket}
//           className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 rounded px-4 py-2 transition-colors"
//         >
//           <IoTrashOutline className="text-red-500" />
//           <span className="hidden md:block">Видалити</span>
//         </button>
//       </div>
//     </li>
//   );
// };

// export default BucketProductCard;

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import HeartButton from './HeartButton/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getProductFromCookies,
} from '../redux/slices/recentlyViewed';

const ProductCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cookies, setCookie] = useCookies(['recentlyViewed']);
  const dispatch = useDispatch();
  const recentlyViewedIds = useSelector((state) => state.recentlyViewed);

  useEffect(() => {
    dispatch(getProductFromCookies());
  }, [dispatch]);

  const handleViewProduct = () => {
    dispatch(addProduct(props.id));
    const updatedRecentlyViewed = [...recentlyViewedIds, props.id];
    setCookie('recentlyViewed', updatedRecentlyViewed, { path: '/' });
  };

  const toggleHover = () => {
    setIsHovered((prevState) => !prevState);
  };

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg overflow-hidden p-2">
      <div
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="flex flex-1 max-w-[250px] flex-col w-full max-sm:w-full"
      >
        <div className="relative">
          <img
            src={`http://127.0.0.1:5000/${props.image}`}
            alt={props.title}
            className="w-[250px] h-[250px] rounded-md"
          />
          {isHovered && (
            <div className="absolute rounded-full bg-white w-10 h-10  right-4 top-4">
              <HeartButton productId={props.id} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 justify-between">
          <Link
            to={`/product/${props.id}`}
            className="mt-2 text-xl leading-normal font-semibold font-palanquin line-clamp-2 h-16"
            onClick={handleViewProduct}
          >
            {props.title}
          </Link>
          <div className=" flex items-center justify-between">
            <div className="flex items-center">
              {props.rating ? (
                <>
                  <FaStar className="mr-1 text-coral-red" />
                  <p className="font-montserrat text-xl leading-normal text-slate-gray">
                    ({props.rating})
                  </p>
                </>
              ) : (
                <>
                  <FaStar className="mr-1 text-coral-red" />{' '}
                  <p className="font-montserrat  leading-normal text-slate-gray">
                    (0)
                  </p>
                </>
              )}
            </div>
            <p className="mt-1 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
              {props.price} грн.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

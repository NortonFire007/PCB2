import { FaStar } from 'react-icons/fa6';

const DisplayStarRating = ({ rating = 1, size = 16 }) => {
  const stars = Array(5).fill(0);

  return (
    <ul className="flex">
      {stars.map((_, ind) => (
        <li className={ind < rating ? 'text-yellow-500' : ''} key={ind}>
          <FaStar size={size} />
        </li>
      ))}
    </ul>
  );
};

export default DisplayStarRating;

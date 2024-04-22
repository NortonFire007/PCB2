import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const StarRating = ({ count = 5 }) => {
  const [currentStar, setCurrentStar] = useState(0);
  const [hoverStar, setHoverStar] = useState();

  const stars = Array(count).fill(0);

  return (
    <ul className="flex justify-center">
      {stars.map((_, ind) => (
        <li
          className={
            (ind <= currentStar ? 'text-yellow-500' : '') ||
            (ind <= hoverStar ? 'text-yellow-500' : '')
          }
          key={ind}
          onMouseMove={() => setHoverStar(ind)}
          onMouseOut={() => setHoverStar()}
          onClick={() => setCurrentStar(ind)}
        >
          <FaStar />
        </li>
      ))}
    </ul>
  );
};

export default StarRating;

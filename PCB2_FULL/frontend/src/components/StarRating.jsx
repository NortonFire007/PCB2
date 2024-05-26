import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa6';

const StarRating = ({ count = 5, currentRating, setRating }) => {
  const [hoverStar, setHoverStar] = useState(0);

  const stars = Array(count).fill(0);

  useEffect(() => {
    setHoverStar(currentRating - 1);
  }, [currentRating]);

  return (
    <ul className="flex justify-center">
      {stars.map((_, ind) => (
        <li
          className={ind <= hoverStar ? 'text-yellow-500' : ''}
          key={ind}
          onMouseMove={() => setHoverStar(ind)}
          onMouseOut={() => setHoverStar(currentRating - 1)}
          onClick={() => setRating(ind + 1)}
        >
          <FaStar />
        </li>
      ))}
    </ul>
  );
};

export default StarRating;

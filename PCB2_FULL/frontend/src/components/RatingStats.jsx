const RatingStats = ({ ratings, totalRatings }) => {
  const percentages = ratings.map((count) => {
    if (!totalRatings) return 0;
    return (count / totalRatings) * 100;
  });

  return (
    <div className="mb-2">
      <ul>
        {percentages.map((percentage, index) => (
          <li key={index}>
            <div className="flex items-center gap-2">
              <span>{5 - index} звезд</span>
              <div className="relative flex-grow h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-yellow-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm">{Math.round(percentage)}%</span>
            </div>
          </li>
        ))}
      </ul>
      <p>Количество комментариев: {totalRatings || 0}</p>
    </div>
  );
};

export default RatingStats;

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

// const RatingStats = ({ ratings }) => {
//     const totalRatings = ratings.reduce((acc, curr) => acc + curr, 0);
//     const totalStars = 5 * ratings.length;

//     return (
//       <div>
//         {ratings.map((count, index) => {
//           const percentage = (count / totalRatings) * 100;
//           const filledPercentage = (count / totalStars) * 100;
//           return (
//             <div key={index}>
//               <div className="flex items-center">
//                 <div className="w-8 mr-2">{5 - index} звезда</div>
//                 <div className="relative flex-grow h-2 bg-gray-300 rounded-full overflow-hidden">
//                   <div
//                     className="absolute h-full bg-yellow-500"
//                     style={{ width: `${filledPercentage}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex justify-end text-xs mt-1">
//                 <span>{percentage}%</span>
//               </div>
//             </div>
//           );
//         })}
//         <p>Количество комментариев: {totalRatings}</p>
//       </div>
//     );
//   };

//   export default RatingStats;

// import SearchResult from './SearchResult';

// const SearchResultsList = ({ searchResults }) => {
//   return (
//     <div className="flex bg-white flex-col shadow-sm rounded-lg mt-4 max-h-48 overflow-scroll">
//       {searchResults.map((result, ind) => {
//         return <SearchResult result={result} key={ind} />;
//       })}
//     </div>
//   );
// };
// const SearchResultsList = ({ searchResults, searchBarWidth }) => {
//   return (
//     <div
//       className="flex bg-white flex-col shadow-sm rounded-lg mt-4 max-h-48 overflow-scroll"
//       style={{ width: searchBarWidth }}
//     >
//       {searchResults.map((result, ind) => {
//         return <SearchResult result={result} key={ind} />;
//       })}
//     </div>
//   );
// };

// export default SearchResultsList;

// const SearchResultsList = ({ searchResults, inputWidth }) => {
//   return (
//     <div
//       className="flex bg-white flex-col shadow-sm rounded-lg mt-4 max-h-48 overflow-scroll"
//       style={{ width: inputWidth }}
//     >
//       {searchResults.map((result, ind) => {
//         return <SearchResult result={result} key={ind} />;
//       })}
//     </div>
//   );
// };

// export default SearchResultsList;

import SearchProductCard from './SearchProductCard';

const SearchResultsList = ({ searchResults, inputWidth }) => {
  return (
    <div
      className="flex bg-white flex-col shadow-sm rounded-lg mt-4 max-h-48 overflow-scroll"
      style={{ width: inputWidth }}
    >
      {searchResults.map((result, ind) => (
        <SearchProductCard product={result} key={ind} />
      ))}
    </div>
  );
};

export default SearchResultsList;

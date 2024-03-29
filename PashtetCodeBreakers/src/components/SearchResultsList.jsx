import SearchResult from './SearchResult';

const SearchResultsList = ({ searchResults }) => {
  return (
    <div className="flex bg-white flex-col shadow-sm rounded-lg mt-4 max-h-48 overflow-scroll">
      {searchResults.map((result, ind) => {
        return <SearchResult result={result} key={ind} />;
      })}
    </div>
  );
};

export default SearchResultsList;

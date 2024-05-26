const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center mt-8">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === number
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSearchResults }) => {
  const [text, setText] = useState('');

  const fetchData = (value) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchResults(results);
      });
  };

  const handleChange = (value) => {
    setText(value);
    fetchData(value);
  };
  return (
    <div className="w-[200px] sm:w-[500px] lg:w-[1000px] flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-lg bg-white mr-4">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Що шукаєте?"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent focus:outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;

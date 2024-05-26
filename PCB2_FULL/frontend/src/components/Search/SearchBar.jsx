import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchResultsList from './SearchResultsList';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);

  const fetchData = (value) => {
    if (value.length > 3) {
      fetch(`http://127.0.0.1:5000/products/search?query=${value}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setSearchResults(json);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleChange = (value) => {
    setText(value);
    fetchData(value);
  };

  const handleSearchClick = () => {
    if (text.length > 3) {
      navigate(`/products/search?query=${text}`);
    }
  };

  return (
    <section className="flex items-center max-w-[800px] relative">
      <div className="flex items-center gap-5 p-2.5 sm:border sm:border-slate-gray rounded-lg bg-white w-[600px]">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Що шукаєте?"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className="bg-transparent focus:outline-none w-full"
          ref={inputRef}
        />
      </div>
      <button
        onClick={handleSearchClick}
        className=" bg-purple-500 text-white px-4 h-[45.6px] rounded"
      >
        Знайти
      </button>
      {searchResults.length > 0 && (
        <div className="absolute left-0 top-full z-10 w-full">
          <SearchResultsList searchResults={searchResults} inputWidth={600} />
        </div>
      )}
    </section>
  );
};

export default SearchBar;

// import { useState, useRef, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import SearchResultsList from './SearchResultsList';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const [text, setText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const inputRef = useRef(null);
//   const [inputWidth, setInputWidth] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (inputRef.current) {
//       setInputWidth(inputRef.current.offsetWidth);
//     }
//   }, []);

//   const fetchData = (value) => {
//     if (value.length > 3) {
//       fetch(`http://127.0.0.1:5000/products/search?query=${value}`)
//         .then((response) => response.json())
//         .then((json) => {
//           console.log(json);
//           setSearchResults(json);
//         });
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleChange = (value) => {
//     setText(value);
//     fetchData(value);
//   };

//   const handleSearchClick = () => {
//     if (text.length > 3) {
//       navigate(`/products/search?query=${text}`);
//     }
//   };

//   return (
//     <section className="flex flex-1 flex-col max-w-[800px] relative">
//       <div className="flex items-center gap-5 p-2.5 sm:border sm:border-slate-gray rounded-lg bg-white">
//         <FaSearch className="text-gray-500" />
//         <input
//           type="text"
//           placeholder="Що шукаєте?"
//           value={text}
//           onChange={(e) => handleChange(e.target.value)}
//           className="bg-transparent focus:outline-none w-full"
//           ref={inputRef}
//         />
//       </div>
//       <button
//         onClick={handleSearchClick}
//         className="bg-orange-400 text-white px-4 py-2 rounded"
//       >
//         Знайти
//       </button>
//       {searchResults.length > 0 && (
//         <div className="absolute left-0 top-full z-10 w-full">
//           <SearchResultsList
//             searchResults={searchResults}
//             inputWidth={inputWidth}
//           />
//         </div>
//       )}
//     </section>
//   );
// };

// export default SearchBar;

// import { useState, useRef, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import SearchResultsList from './SearchResultsList';

// const SearchBar = () => {
//   const [text, setText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const inputRef = useRef(null);
//   const [inputWidth, setInputWidth] = useState(0);

//   useEffect(() => {
//     if (inputRef.current) {
//       setInputWidth(inputRef.current.offsetWidth);
//     }
//   }, []);

//   const fetchData = (value) => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value.toLowerCase())
//           );
//         });
//         setSearchResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setText(value);
//     fetchData(value);
//   };
//   return (
//     //sm:w-[500px] lg:w-[1000px] w-[200px]
//     <section className="flex flex-1 flex-col max-w-[800px]">
//       <div className=" flex items-center gap-5 p-2.5 sm:border sm:border-slate-gray rounded-lg bg-white">
//         <FaSearch className="text-gray-500" />
//         <input
//           type="text"
//           placeholder="Що шукаєте?"
//           value={text}
//           onChange={(e) => handleChange(e.target.value)}
//           className="bg-transparent focus:outline-none w-full"
//           ref={inputRef}
//         />
//       </div>
//       <div>
//         {searchResults.length > 0 && (
//           <div className="absolute left-[15%] top-full z-10 w-full">
//             <SearchResultsList
//               searchResults={searchResults}
//               inputWidth={inputWidth}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SearchBar;

import SearchBar from './SearchBar';
import { SlBasket } from 'react-icons/sl';
// import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import SearchResultsList from './SearchResultsList';
import Logo from '../assets/icons/logo.svg';
import { useState } from 'react';
import InOutButton from './InOutButton';
import { Bucket, UserButton } from '../components';
import { Link } from 'react-router-dom';

// const Nav = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   return (
//     <header className=" py-2.5 absolute z-10 w-full main-orange">
//       <nav className="flex justify-between items-center max-container gap-16">
//         <a href="/">
//           <img
//             src={Logo}
//             alt="logo"
//             width={129}
//             height={53}
//             className="m-0 w-[129px] h-[53px]"
//           />
//         </a>
//         <SearchBar setSearchResults={setSearchResults} />
//         <ul className="flex-1 flex justify-end items-center gap-16">
//           <li>
//             <CiHeart className="w-[40px] h-[40px] c" />
//           </li>
//           <li>
//             <BsPersonCircle className="w-[35px] h-[35px]" />
//           </li>
//           <li>
//             <InOutButton onClick={() => {}} />
//           </li>
//         </ul>
//       </nav>
//       {searchResults.length > 0 && (
//         <SearchResultsList searchResults={searchResults} />
//       )}
//     </header>
//   );
// };

const Nav = () => {
  return (
    <header className="py-2.5 absolute z-10 w-full main-orange">
      <nav className="flex justify-between items-center m-auto max-w-[1440px] max-h-[50px] gap-8">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            width={129}
            height={53}
            className="m-0 w-[129px] h-[53px]"
          />
        </Link>
        <SearchBar />
        <ul className=" flex justify-end items-center gap-4">
          {/* <li>
            <CiHeart className="w-[30px] h-[30px]" />
          </li> */}
          <li>
            <UserButton />
          </li>
          <li>
            {/* <SlBasket className="w-[25px] h-[25px]" /> */}
            <Bucket />
          </li>
          {/* <li>
            <InOutButton onClick={() => {}} />
          </li> */}
        </ul>
      </nav>
      {/* {searchResults.length > 0 && (
        <SearchResultsList searchResults={searchResults} />
      )} */}
    </header>
  );
};

export default Nav;

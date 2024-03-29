// const Footer = () => {
//   return (
//     <footer className="max-container">
//       <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
//         <div>
//           <h3 className="">PASHTET</h3>
//           <p>
//             ТМ використовується на підставі ліцензії правовласника Pashtet Code
//             Breakers © 2024 Благодійний маркет-плейс «PASHTET™»
//           </p>
//         </div>
//         <div>
//           <ul></ul>
//           <ul></ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import { Link } from 'react-router-dom';
// import { footerLinks } from '../constants';

// const Footer = () => {
//   return (
//     <footer className="max-container py-8">
//       <div className="max-container flex flex-row justify-between items-start gap-20 flex-wrap md:flex-col">
//         <div className="w-full md:w-auto">
//           <h3 className="text-xl font-bold mb-4 text-white">PASHTET</h3>
//           <p className="text-white text-wrap">
//             ТМ використовується на підставі ліцензії правовласника Pashtet Code
//             Breakers © 2024 Благодійний маркет-плейс «PASHTET™»
//           </p>
//         </div>
//         {footerLinks.map((footerLink, index) => (
//           <div key={index} className="w-full md:w-auto mb-4 md:mb-0">
//             <h4 className="text-lg font-bold mb-2">{footerLink.title}</h4>
//             <ul className="list-disc list-inside">
//               {footerLink.links.map((link, index) => (
//                 <li key={index}>
//                   <a
//                     href={link.link}
//                     className="text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-100"
//                   >
//                     {link.name}
//                   </a>
//                   {/* <Link
//                     to={link.link}
//                     className="text-gray-700 hover:text-gray-900 hover:underline transition-colors duration-100"
//                   >
//                     {link.name}
//                   </Link> */}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// const Footer = () => {
//   return (
//     <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
//       <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
//         <div className="sm:flex sm:items-center sm:justify-between">
//           <a
//             href="https://flowbite.com/"
//             className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
//           >
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="h-8"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               Flowbite
//             </span>
//           </a>
//           <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//             <li>
//               <a href="#" className="hover:underline me-4 md:me-6">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline me-4 md:me-6">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline me-4 md:me-6">
//                 Licensing
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//         <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//         <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
//           © 2024{' '}
//           <a href="/" className="hover:underline">
//             Pashtet™
//           </a>
//           . All Rights Reserved.
//         </span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { footerLinks } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-black rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              PASHTET
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 gap-16">
            {footerLinks.map((linkGroup, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold mb-2">{linkGroup.title}</h3>
                <ul className="flex flex-col space-y-1">
                  {linkGroup.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.link} className="hover:underline">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2024{' '}
          <a href="/" className="hover:underline">
            Pashtet™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

// import COVER_IMAGE from '../../assets/images/register-photo-1.jpg';
// import { FcGoogle } from 'react-icons/fc';
// import { FaFacebook } from 'react-icons/fa';
// import SocialSignInBtn from './SocialSignInBtn';
// import Input from './Input';
// import { useState } from 'react';
// import { TEInput, TERipple } from 'tw-elements-react';
// // import TelInput from './TelInput';

// const Register = () => {
//   const [values, setValues] = useState({
//     username: '',
//     surname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     city: '',
//     tel: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     console.log(e);
//   };

//   // return (
//   //   <div className="w-full h-screen flex items-start">
//   //     <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
//   //       <div className="w-full flex flex-col max-w-[500px]">
//   //         <div className="w-full flex flex-col mb-2">
//   //           <h3 className="text-3xl font-semibold mb-2">Sign up</h3>
//   //           <p className="text-base mb-2">
//   //             Welcome Back! Please enter your details.
//   //           </p>
//   //         </div>
//   //         <div className="w-full flex flex-col">
//   //           <div className="flex gap-3">
//   //             <Input type="text" placeholder="Name" id="name" />
//   //             <Input type="text" placeholder="Surname" id="surname" />
//   //           </div>
//   //           <Input type="email" placeholder="Email" id="email" />
//   //           <div className="flex gap-3">
//   //             <Input type="password" placeholder="Password" id="password" />
//   //             <Input
//   //               type="password"
//   //               placeholder="Confirm password"
//   //               id="confirm-password"
//   //             />
//   //           </div>
//   //           <div className="flex gap-3">
//   //             <Input type="text" placeholder="City" id="city" />
//   //             {/* <TelInput /> */}
//   //             <Input
//   //               type="tel"
//   //               placeholder="Tel"
//   //               id="tel"
//   //               pattern="\+380[0-9]+"
//   //               value="+380"
//   //             />
//   //           </div>
//   //         </div>

//   //         <div className="w-full flex flex-col my-4">
//   //           <button className="w-full text-white font-semibold bg-[#060606] border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center">
//   //             Sign up
//   //           </button>
//   //         </div>

//   //         <div className="w-full flex items-center justify-center relative py-2">
//   //           <div className="w-full h-[1px] bg-black"></div>
//   //           <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
//   //         </div>

//   //         <SocialSignInBtn
//   //           icon={FcGoogle}
//   //           bgColor="white"
//   //           textColor="#060606"
//   //           text="Login with Google"
//   //         />
//   //         <SocialSignInBtn
//   //           icon={FaFacebook}
//   //           bgColor="sky-900"
//   //           textColor="#060606"
//   //           text="Login with Facebook"
//   //         />
//   //       </div>

//   //       <div className="w-full flex items-center justify-center">
//   //         <p className="text-sm font-normal text-[#060606]">
//   //           Already have an account?{' '}
//   //           <span className="font-semibold underline underline-offset-2 cursor-pointer">
//   //             {' '}
//   //             Sign in
//   //           </span>
//   //         </p>
//   //       </div>
//   //     </div>

//   //     <div className="relative w-1/2 h-full flex flex-col">
//   //       <div className="absolute top-[20%] left-[10%] flex flex-col">
//   //         <h1 className="text-4xl text-white font-bold my-4">
//   //           Turn Your Ideas into reality
//   //         </h1>
//   //         <p className="text-xl text-white font-normal">
//   //           Start for free and get attractive offers from the community
//   //         </p>
//   //       </div>
//   //       <img src={COVER_IMAGE} className="w-full h-full object-cover" />
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="w-full h-full flex items-start">
//       <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
//         <div className="w-full flex flex-col max-w-[500px]">
//           <div className="w-full flex flex-col mb-2">
//             <h3 className="text-3xl font-semibold mb-2">Sign up</h3>
//             <p className="text-base mb-2">
//               Hi there! Please enter your details.
//             </p>
//           </div>
//           <form onSubmit={handleOnSubmit}>
//             <div className="w-full flex flex-col">
//               <div className="flex gap-3">
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Name"
//                   name="username"
//                   pattern={'^[A-Za-z]{3,16}$'}
//                   value={values.username}
//                   onChange={handleInputChange}
//                   errorMessage={
//                     "Name should be 3-16 characters and shouldn't include any special character!"
//                   }
//                 />
//                 <Input
//                   id="surname"
//                   type="text"
//                   placeholder="Surname"
//                   name="surname"
//                   value={values.surname}
//                   onChange={handleInputChange}
//                   errorMessage={
//                     "Surname should be 3-16 characters and shouldn't include any special character!"
//                   }
//                 />
//               </div>

//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 value={values.email}
//                 onChange={handleInputChange}
//                 errorMessage={'It should be a valid email address!'}
//               />
//               <div className="flex gap-3">
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Password"
//                   name="password"
//                   pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
//                   value={values.password}
//                   onChange={handleInputChange}
//                   errorMessage={
//                     'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!'
//                   }
//                 />
//                 <Input
//                   id="confirm-password"
//                   type="password"
//                   placeholder="Confirm Password"
//                   name="confirmPassword"
//                   pattern={values.password}
//                   value={values.confirmPassword}
//                   onChange={handleInputChange}
//                   errorMessage={"Password don't match!"}
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <Input
//                   id="city"
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={values.city}
//                   onChange={handleInputChange}
//                   errorMessage={'It should be a valid city!'}
//                 />
//                 <Input
//                   id="tel"
//                   type="tel"
//                   placeholder="Tel"
//                   name="tel"
//                   pattern={`/^+380([0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3})$/`}
//                   value={values.tel}
//                   onChange={handleInputChange}
//                   errorMessage={'It should be a valid tel number!'}
//                 />
//               </div>
//             </div>

//             <div className="w-full flex flex-col my-4">
//               <button className="w-full text-white font-semibold bg-[#060606] border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center">
//                 Sign up
//               </button>
//             </div>
//           </form>
//           <div className="w-full flex items-center justify-center relative py-2">
//             <div className="w-full h-[1px] bg-black"></div>
//             <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
//           </div>
//           <SocialSignInBtn
//             icon={FcGoogle}
//             bgColor="white"
//             textColor="#060606"
//             text="Login with Google"
//           />
//           {/* <TERipple rippleColor="light" className="w-full">
//             <a
//               className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//               style={{ backgroundColor: '#3b5998' }}
//               href="#!"
//               role="button"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="mr-2 h-3.5 w-3.5"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
//               </svg>
//               Continue with Facebook
//             </a>
//           </TERipple> */}
//           <SocialSignInBtn
//             icon={FaFacebook}
//             bgColor="sky-900"
//             textColor="#060606"
//             text="Login with Facebook"
//           />
//         </div>

//         <div className="w-full flex items-center justify-center">
//           <p className="text-sm font-normal text-[#060606]">
//             Already have an account?{' '}
//             <span className="font-semibold underline underline-offset-2 cursor-pointer">
//               {' '}
//               Sign in
//             </span>
//           </p>
//         </div>
//       </div>

//       <div className="relative w-1/2 h-full flex flex-col">
//         <div className="absolute top-[20%] left-[10%] flex flex-col">
//           <h1 className="text-4xl text-white font-bold my-4">
//             Turn Your Ideas into reality
//           </h1>
//           <p className="text-xl text-white font-normal">
//             Start for free and get attractive offers from the community
//           </p>
//         </div>
//         <img src={COVER_IMAGE} className="w-full h-full object-cover" />
//       </div>
//     </div>
//   );
// };

// export default Register;

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     surname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     city: '',
//     tel: '',
//   });

//   // const history = useHistory();

//   const handleSignInClick = () => {
//     // history.push('/login');
//     return redirect('/login');
//   };

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       // Submit form data
//       console.log(formData);
//     } else {
//       setErrors(validationErrors);
//       console.log(errors);
//     }
//   };

//   // const validateForm = (values) => {
//   //   const errors = {};
//   //   const nameRegex = /^[A-Za-z]{3,16}$/;
//   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   const passwordRegex =
//   //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
//   //   const telRegex = /^(\+380)([0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3})$/;

//   //   if (!values.username || !nameRegex.test(values.username)) {
//   //     errors.username =
//   //       "Name should be 3-16 characters and shouldn't include any special character!";
//   //   }
//   //   if (!values.surname || !nameRegex.test(values.surname)) {
//   //     errors.surname =
//   //       "Surname should be 3-16 characters and shouldn't include any special character!";
//   //   }
//   //   if (!values.email || !emailRegex.test(values.email)) {
//   //     errors.email = 'It should be a valid email address!';
//   //   }
//   //   if (!values.password || !passwordRegex.test(values.password)) {
//   //     errors.password =
//   //       'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!';
//   //   }
//   //   if (values.confirmPassword !== values.password) {
//   //     errors.confirmPassword = "Password don't match!";
//   //   }
//   //   if (!values.city) {
//   //     errors.city = 'It should be a valid city!';
//   //   }
//   //   if (!values.tel || !telRegex.test(values.tel)) {
//   //     errors.tel = 'It should be a valid tel number!';
//   //   }

//   //   return errors;
//   // };

//   return (
//     <div className="w-full h-full flex items-start">
//       <div className="w-full h-full bg-[#f5f5f5] flex flex-col p-8 justify-between items-center">
//         <div className="w-full flex flex-col max-w-[500px]">
//           <div className="w-full flex flex-col mb-2">
//             <h3 className="text-3xl font-semibold mb-2">Sign up</h3>
//             <p className="text-base mb-2">
//               Hi there! Please enter your details.
//             </p>
//           </div>
//           <form onSubmit={handleOnSubmit}>
//             <div className="w-full flex flex-col">
//               <div className="flex gap-3">
//                 <Input
//                   id="username"
//                   type="text"
//                   placeholder="Name"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   errorMessage={errors.username}
//                 />
//                 <Input
//                   id="surname"
//                   type="text"
//                   placeholder="Surname"
//                   name="surname"
//                   value={formData.surname}
//                   onChange={handleInputChange}
//                   errorMessage={errors.surname}
//                 />
//               </div>

//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 errorMessage={errors.email}
//               />
//               <div className="flex gap-3">
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   errorMessage={errors.password}
//                 />
//                 <Input
//                   id="confirm-password"
//                   type="password"
//                   placeholder="Confirm Password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   errorMessage={errors.confirmPassword}
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <Input
//                   id="city"
//                   type="text"
//                   placeholder="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   errorMessage={errors.city}
//                 />
//                 <Input
//                   id="tel"
//                   type="tel"
//                   placeholder="Tel"
//                   name="tel"
//                   value={formData.tel}
//                   onChange={handleInputChange}
//                   errorMessage={errors.tel}
//                 />
//               </div>
//             </div>

//             <div className="w-full flex flex-col my-4">
//               <button className="w-full text-white font-semibold bg-[#060606] border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center">
//                 Sign up
//               </button>
//             </div>
//           </form>
//           <div className="w-full flex items-center justify-center relative py-2">
//             <div className="w-full h-[1px] bg-black"></div>
//             <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
//           </div>
//           <SocialSignInBtn
//             icon={FcGoogle}
//             bgColor="white"
//             textColor="#060606"
//             text="Login with Google"
//           />
//           <SocialSignInBtn
//             icon={FaFacebook}
//             bgColor="sky-900"
//             textColor="#060606"
//             text="Login with Facebook"
//           />
//         </div>

//         <div className="w-full flex items-center justify-center">
//           <p className="text-sm font-normal text-[#060606]">
//             Already have an account?{' '}
//             <span
//               className="font-semibold underline underline-offset-2 cursor-pointer"
//               onClick={handleSignInClick}
//             >
//               {' '}
//               Sign in
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* <div className="relative w-1/2 h-full flex flex-col">
//         <div className="absolute top-[20%] left-[10%] flex flex-col">
//           <h1 className="text-4xl text-white font-bold my-4">
//             Turn Your Ideas into reality
//           </h1>
//           <p className="text-xl text-white font-normal">
//             Start for free and get attractive offers from the community
//           </p>
//         </div>
//         <img src={COVER_IMAGE} className="w-full h-full object-cover" />
//       </div> */}
//     </div>
//   );
// };
// Файл с валидацией формы

// return (
//   <div className="w-full  h-screen flex">
//     <div className="w-full h-screen bg-[#f5f5f5] flex flex-col p-8 justify-between items-center">
//       <div className="w-full flex flex-col max-w-[500px]">
//         <div className="w-full flex flex-col mb-2">
//           <h3 className="text-3xl font-semibold mb-2">Sign up</h3>
//           <p className="text-base mb-2">
//             Hi there! Please enter your details.
//           </p>
//         </div>
//         <form onSubmit={handleOnSubmit}>
//           <div className="w-full flex flex-col">
//             <div className="flex gap-3">
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Name"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 errorMessage={errors.username}
//               />
//               <Input
//                 id="surname"
//                 type="text"
//                 placeholder="Surname"
//                 name="surname"
//                 value={formData.surname}
//                 onChange={handleInputChange}
//                 errorMessage={errors.surname}
//               />
//             </div>

//             <Input
//               id="email"
//               type="email"
//               placeholder="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               errorMessage={errors.email}
//             />
//             <div className="flex gap-3">
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 errorMessage={errors.password}
//               />
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 placeholder="Confirm Password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 errorMessage={errors.confirmPassword}
//               />
//             </div>
//             <div className="flex gap-3">
//               <Input
//                 id="city"
//                 type="text"
//                 placeholder="City"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 errorMessage={errors.city}
//               />
//               <Input
//                 id="tel"
//                 type="tel"
//                 placeholder="Tel"
//                 name="tel"
//                 value={formData.tel}
//                 onChange={handleInputChange}
//                 errorMessage={errors.tel}
//               />
//             </div>
//           </div>
//           <div className="w-full flex justify-center">
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 px-4 mt-6 rounded hover:bg-gray-800 focus:outline-none"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <div className="w-full flex items-center justify-center relative py-2">
//           <div className="w-full h-[1px] bg-black"></div>
//           <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
//         </div>
//         <SocialSignInBtn
//           icon={FcGoogle}
//           bgColor="white"
//           textColor="#060606"
//           text="Login with Google"
//         />
//         <SocialSignInBtn
//           icon={FaFacebook}
//           bgColor="sky-900"
//           textColor="#060606"
//           text="Login with Facebook"
//         />
//       </div>

//       <div className="w-full flex items-center justify-center">
//         <p className="text-sm font-normal text-[#060606]">
//           Already have an account?{' '}
//           <span
//             className="font-semibold underline underline-offset-2 cursor-pointer"
//             // onClick={handleSignInClick}
//           >
//             {' '}
//             Sign in
//           </span>
//         </p>
//       </div>
//     </div>

//     {/* <div className="relative w-1/2 h-full flex flex-col">
//       <div className="absolute top-[20%] left-[10%] flex flex-col">
//         <h1 className="text-4xl text-white font-bold my-4">
//           Turn Your Ideas into reality
//         </h1>
//         <p className="text-xl text-white font-normal">
//           Start for free and get attractive offers from the community
//         </p>
//       </div>
//       <img src={COVER_IMAGE} className="w-full h-full object-cover" />
//     </div> */}
//   </div>
// );

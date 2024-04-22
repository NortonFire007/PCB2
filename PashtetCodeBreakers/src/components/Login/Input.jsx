// const Input = ({ type, placeholder, id }) => {
//   return (
//     <input
//       type={type}
//       placeholder={placeholder}
//       id={id}
//       className="w-full text-black bg-transparent py-2 my-2 border-b border-black outline-none focus:outline-none"
//     />
//   );
// };

// export default Input;

// const Input = ({
//   id,
//   type,
//   placeholder,
//   value,
//   onChange,
//   pattern,
//   maxLength,
//   name,
//   errorMessage,
// }) => {
//   return (
//     <div className="w-full ">
//       <input
//         type={type}
//         placeholder={placeholder}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         pattern={pattern}
//         maxLength={maxLength}
//         className="w-full text-black bg-transparent py-2 my-2 border-b border-black outline-none focus:outline-none"
//       />
//       {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Input;

// import { useState } from 'react';

// const Input = ({
//   id,
//   type,
//   placeholder,
//   value,
//   onChange,
//   pattern,
//   maxLength,
//   name,
//   errorMessage,
// }) => {
//   const [error, setError] = useState(false);
//   const [focused, setFocused] = useState(false);

//   const handleFocus = (e) => {
//     setFocused(true);
//   };

//   // const handleInputChange = (event) => {
//   //   const inputValue = event.target.value;
//   //   onChange();

//   //   const matchesPattern = pattern && new RegExp(pattern).test(inputValue);
//   //   setError(!matchesPattern);
//   // };

//   return (
//     <div className="w-full ">
//       <input
//         type={type}
//         placeholder={placeholder}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         pattern={pattern}
//         maxLength={maxLength}
//         onBlur={handleFocus}
//         focused={focused.toString()}
//         className={`w-full text-black bg-transparent py-2 my-2 border-b border-black outline-none focus:outline-none ${
//           error ? 'border-red-500' : ''
//         }`}
//       />
//       {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Input;

// import { useState, useEffect } from 'react';

// const Input = ({
//   id,
//   type,
//   placeholder,
//   value,
//   onChange,
//   pattern,
//   maxLength,
//   name,
//   errorMessage,
// }) => {
//   const [error, setError] = useState(false);
//   const [focused, setFocused] = useState(false);

//   useEffect(() => {
//     if (focused) {
//       const matchesPattern = pattern && new RegExp(pattern).test(value);
//       setError(!matchesPattern);
//     } else {
//       setError(false);
//     }
//   }, [focused, value, pattern]);

//   const handleFocus = () => {
//     setFocused(true);
//   };

//   const handleBlur = () => {
//     setFocused(false);
//   };

//   return (
//     <div className="w-full">
//       <input
//         type={type}
//         placeholder={placeholder}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         pattern={pattern}
//         maxLength={maxLength}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         className={`w-full text-black bg-transparent py-2 my-2 border-b border-black outline-none focus:outline-none ${
//           error ? 'border-red-500' : ''
//         }`}
//       />
//       {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Input;

// import { useState, useEffect } from 'react';

// const Input = ({
//   id,
//   type,
//   placeholder,
//   value,
//   onChange,
//   pattern,
//   maxLength,
//   name,
//   errorMessage,
// }) => {
//   const [error, setError] = useState(false);
//   const [focused, setFocused] = useState(false);
//   const [valid, setValid] = useState(false);

//   useEffect(() => {
//     if (focused) {
//       const matchesPattern = pattern && new RegExp(pattern).test(value);
//       console.log(pattern);
//       console.log(matchesPattern);
//       setError(!matchesPattern);
//       setValid(matchesPattern);
//       console.log('focused');
//     } else {
//       setError(false);
//       setValid(false);
//     }
//   }, [focused, value, pattern]);

//   const handleFocus = () => {
//     setFocused(true);
//   };

//   const handleBlur = () => {
//     setFocused(false);
//   };

//   return (
//     <div className="w-full">
//       <input
//         type={type}
//         placeholder={placeholder}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         pattern={pattern}
//         maxLength={maxLength}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         className={`w-full text-black bg-transparent py-2 my-2 border-b outline-none focus:outline-none ${
//           error ? 'border-red-500' : valid ? 'border-green-500' : 'border-black'
//         }`}
//       />
//       {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Input;

const Input = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  name,
  errorMessage,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full text-black bg-transparent py-2 my-2 border-b outline-none focus:outline-none ${
          errorMessage ? 'border-red-500' : 'border-black'
        }`}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};
export default Input;

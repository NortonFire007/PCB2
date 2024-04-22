export const errorMessages = {
  username:
    "Name should be 3-16 characters and shouldn't include any special character!",
  surname:
    "Surname should be 3-16 characters and shouldn't include any special character!",
  email: 'It should be a valid email address!',
  password:
    'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
  confirmPassword: "Password don't match!",
  city: 'It should be a valid city!',
  tel: 'It should be a valid tel number!',
};

// export const validateField = (name, value, formData) => {
//   switch (name) {
//     case 'username':
//     case 'surname':
//       return /^[A-Za-z]{3,16}$/.test(value);
//     case 'email':
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     case 'password':
//       return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,20}$/.test(
//         value
//       );
//     case 'confirmPassword':
//       return value === formData.password;
//     case 'city':
//       return value.trim() !== '';
//     case 'tel':
//       return /^(\+380)([0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3})$/.test(value);
//     default:
//       return true;
//   }
// };

const validateForm = (values) => {
  const errors = {};
  const nameRegex = /^[A-Za-z]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const telRegex = /^(\+380)([0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3})$/;

  if (!values.username || !nameRegex.test(values.username)) {
    errors.username =
      "Name should be 3-16 characters and shouldn't include any special character!";
  }
  if (!values.surname || !nameRegex.test(values.surname)) {
    errors.surname =
      "Surname should be 3-16 characters and shouldn't include any special character!";
  }
  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = 'It should be a valid email address!';
  }
  if (!values.password || !passwordRegex.test(values.password)) {
    errors.password =
      'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password don't match!";
  }
  if (!values.city) {
    errors.city = 'It should be a valid city!';
  }
  if (!values.tel || !telRegex.test(values.tel)) {
    errors.tel = 'It should be a valid tel number!';
  }

  return errors;
};

export default validateForm;

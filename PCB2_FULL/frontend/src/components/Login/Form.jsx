import { useState } from 'react';

const Form = ({ children }) => {
  const [values, setValues] = useState({
    username: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    tel: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return children(values, handleInputChange);
};

export default Form;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import COVER_IMAGE from '../../assets/images/register-photo-1.jpg';
import { setUser } from '../../redux/slices/userSlice';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SocialSignInBtn from './SocialSignInBtn';
import Input from './Input';
import axios from 'axios';
import validateForm from './ValidationForm';
import { errorMessages } from './validationUtils';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    tel: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const register = (formData) => {
    return axios.post('http://127.0.0.1:5000/register', formData);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return /^[A-Za-z]{3,16}$/.test(value);
      case 'surname':
        return /^[A-Za-z]{3,16}$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,20}$/.test(
          value
        );
      case 'confirmPassword':
        return value === formData.password;
      case 'city':
        return value.trim() !== '';
      case 'tel':
        return /^(\+380)([0-9]{9}|[0-9]{3}-[0-9]{2}-[0-9]{3})$/.test(value);
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const newErrors = { ...errors };
    if (validateField(name, value)) {
      delete newErrors[name];
    } else {
      newErrors[name] = errorMessages[name];
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    for (const [fieldName, fieldValue] of Object.entries(formData)) {
      if (!validateField(fieldName, fieldValue)) {
        newErrors[fieldName] = errorMessages[fieldName];
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
    const isValid = validateForm();

    if (isValid) {
      // console.log(formData);
      try {
        const response = await register(formDataWithoutConfirmPassword);
        console.log(response.data);
        const { id, accessToken } = response.data;
        console.log(id, accessToken);
        dispatch(setUser({ id, accessToken }));
        navigate('/sign-in');
      } catch (error) {
        console.log('Erorororororoor!!!');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="w-full h-screen flex items-start mb-32">
      <div className="w-full h-full flex flex-col p-8 justify-between items-center">
        <Link to="/">
          <IoArrowBackCircleOutline
            size={48}
            className="absolute left-[25%] top-[10%] max-w:sm"
          />
        </Link>
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2 text-[#f4973b]">
              Sign up
            </h3>
            <p className="text-base mb-2">
              Hi there! Please enter your details.
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="w-full flex flex-col">
              <div className="flex gap-3">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  errorMessage={errors.name}
                />
                <Input
                  id="surname"
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  errorMessage={errors.surname}
                />
              </div>

              <Input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                errorMessage={errors.email}
              />
              <div className="flex gap-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  errorMessage={errors.password}
                />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  errorMessage={errors.confirmPassword}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  errorMessage={errors.city}
                />
                <Input
                  id="tel"
                  type="tel"
                  placeholder="Tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                  errorMessage={errors.tel}
                />
              </div>
            </div>

            <div className="w-full flex flex-col my-4">
              <button className="w-full text-white font-semibold bg-[#f4973b] border-2 border-[#d38332d5] rounded-md p-4 my-2 text-center flex items-center justify-center">
                Sign up
              </button>
            </div>
          </form>
          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>
          <SocialSignInBtn
            icon={FcGoogle}
            bgColor="white"
            textColor="#060606"
            text="Login with Google"
          />
          <SocialSignInBtn
            icon={FaFacebook}
            bgColor="sky-900"
            textColor="#060606"
            text="Login with Facebook"
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Already have an account?{' '}
            <Link
              to="/sign-in"
              className="font-semibold underline underline-offset-2 cursor-pointer"
              // onClick={handleSignInClick}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover" />
      </div> */}
    </div>
  );
};

export default Register;

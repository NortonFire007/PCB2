import { useState } from 'react';
import COVER_IMAGE from '../../assets/images/register-photo-1.jpg';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SocialSignInBtn from './SocialSignInBtn';
import Input from './Input';
import validateForm from './ValidationForm';
import { redirect } from 'react-router-dom';
import { errorMessages } from './validationUtils';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    tel: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log(formData);
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-full h-full bg-[#f5f5f5] flex flex-col p-8 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Sign up</h3>
            <p className="text-base mb-2">
              Hi there! Please enter your details.
            </p>
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="w-full flex flex-col">
              <div className="flex gap-3">
                <Input
                  id="username"
                  type="text"
                  placeholder="Name"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  errorMessage={errors.username}
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
              <button className="w-full text-white font-semibold bg-[#060606] border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center">
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

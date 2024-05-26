import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { setUser } from '../../redux/slices/userSlice';
import axios from 'axios';
import COVER_IMAGE from '../../assets/images/login-photo-1.jpg';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SocialSignInBtn from './SocialSignInBtn';
import Input from './Input';
import { login } from '../../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const login = (formData) => {
  //   return axios.post('http://127.0.0.1:5000/login', formData);
  // };

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(formData);

  //   try {
  //     const response = await login(formData);
  //     console.log('response.data', response.data);
  //     const { id, accessToken } = response.data;
  //     console.log('user, token', id, accessToken);
  //     dispatch(setUser({ id, accessToken }));
  //     console.log('Success sukaa!!!');
  //     return redirect('/');
  //   } catch (error) {
  //     console.log('Error occurred:', error);
  //     setError('Incorrect email or password.');
  //   }
  // };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="w-full h-screen flex items-start">
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

      <div className="w-full h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2 text-[#f4973b]">
              Login
            </h3>
            <p className="text-base mb-2">
              Welcome Back! Please enter your details.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <Input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm">Remember Me</p>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Forgot Password?
            </p>
          </div>
          {error && (
            <p className=" m-auto text-red-500 text-sm">
              Невірна пошта або пароль!
            </p>
          )}

          <div className="w-full flex flex-col my-4">
            <button
              onClick={handleOnSubmit}
              className="w-full text-white font-semibold bg-[#f4973b] border-2 border-[#d38332d5] rounded-md p-4 my-2 text-center flex items-center justify-center"
            >
              Log In
            </button>
            {/* <LoginBtn
              bgColor="white"
              textColor="rgb(255, 255, 255)"
              text="Log In"
            /> */}
            {/* <button className="w-full text-[#060606] font-semibold bg-white border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center">
              Register
            </button> */}
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>

          {/* <div className="w-full text-[#060606] font-semibold bg-white border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center cursor-pointer">
            <FcGoogle className="h-6 mr-2" />
            Sign in with Google
          </div> */}
          <SocialSignInBtn
            icon={FcGoogle}
            bgColor="white"
            textColor="#060606"
            text="Sign in with Google"
          />
          <SocialSignInBtn
            icon={FaFacebook}
            bgColor="white"
            textColor="#060606"
            text="Sign in with Facebook"
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have an account?{' '}
            <Link
              to="/create-account"
              className="font-semibold underline underline-offset-2 cursor-pointer"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

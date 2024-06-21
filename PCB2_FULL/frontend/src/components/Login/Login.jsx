import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import SocialSignInBtn from './SocialSignInBtn';
import Input from './Input';
import { login } from '../../redux/slices/userSlice';
import {
  setError,
  clearError,
  selectErrorMessage,
} from '../../redux/slices/errorSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const error = useSelector(selectErrorMessage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(clearError());
  // }, [dispatch]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      dispatch(clearError());
      navigate('/');
    } catch (err) {
      dispatch(setError('Incorrect email or password!'));
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-full h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <Link to="/">
          <IoArrowBackCircleOutline
            size={48}
            className="absolute left-[25%] top-[16%] max-w:sm"
          />
        </Link>
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2 text-[#f4973b]">
              Увійти
            </h3>
            <p className="text-base mb-2">
              З поверненням! Будь ласка, введіть свої дані.
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
              <p className="text-sm">Запамя'тати мене</p>
            </div>

            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              Забули пароль?
            </p>
          </div>
          {/* {error && (
            <p className="m-auto text-red-500 text-sm">
              Incorrect email or password!
            </p>
          )} */}

          <div className="w-full flex flex-col my-4">
            <button
              onClick={handleOnSubmit}
              className="w-full text-white font-semibold bg-[#f4973b] border-2 border-[#d38332d5] rounded-md p-4 my-2 text-center flex items-center justify-center"
            >
              Увійти
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">або</p>
          </div>

          <SocialSignInBtn
            icon={FcGoogle}
            bgColor="white"
            textColor="#060606"
            text="Увійдіть за допомогою Google"
          />
          <SocialSignInBtn
            icon={FaFacebook}
            bgColor="white"
            textColor="#060606"
            text="Увійдіть через Facebook"
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Немає облікового запису?{' '}
            <Link
              to="/create-account"
              className="font-semibold underline underline-offset-2 cursor-pointer"
            >
              Зареєструйтеся безкоштовно
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

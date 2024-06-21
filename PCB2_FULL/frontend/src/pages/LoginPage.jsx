import { useState } from 'react';
import Login from '../components/Login/Login';

const LoginPage = () => {
  const [signIn, toggle] = useState(true);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;

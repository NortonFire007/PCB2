import { Facebook } from 'react-facebook-sdk';
import { useEffect, useState } from 'react';

const FacebookLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    Facebook.getLoginStatus((response) => {
      setIsLoggedIn(response.status === 'connected');
      setUserID(response.authResponse ? response.authResponse.userID : '');
    });
  }, []);

  const handleLogin = () => {
    Facebook.login(
      (response) => {
        if (response.status === 'connected') {
          setIsLoggedIn(true);
          setUserID(response.authResponse.userID);
        }
      },
      { scope: 'email' }
    );
  };

  const handleLogout = () => {
    Facebook.logout(() => {
      setIsLoggedIn(false);
      setUserID('');
    });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {!isLoggedIn && (
        <button
          className="w-full text-white font-semibold bg-blue-500 border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center cursor-pointer"
          onClick={handleLogin}
        >
          <i className="fab fa-facebook-f mr-2" />
          Login with Facebook
        </button>
      )}
      {isLoggedIn && (
        <button
          className="w-full text-white font-semibold bg-blue-500 border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center cursor-pointer"
          onClick={handleLogout}
        >
          <i className="fab fa-facebook-f mr-2" />
          Logout
        </button>
      )}

      {isLoggedIn && <p>User ID: {userID}</p>}
    </div>
  );
};

export default FacebookLoginButton;

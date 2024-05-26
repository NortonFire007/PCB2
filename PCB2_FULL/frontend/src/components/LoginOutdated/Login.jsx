import { useState } from 'react';
import LoginForm from './LoginForm';

function Login() {
  const [containerState, setContainerState] = useState('sign-in');
  const [overlayState, setOverlayState] = useState(false);

  const switchContainerState = () => {
    setContainerState((prev) => (prev === 'sign-in' ? 'sign-up' : 'sign-in'));
    setOverlayState(true);
  };

  return (
    <div className="relative w-full max-w-md h-screen mx-auto">
      <LoginForm
        containerState={containerState}
        overlayState={overlayState}
        switchContainerState={switchContainerState}
      />
    </div>
  );
}

export default Login;

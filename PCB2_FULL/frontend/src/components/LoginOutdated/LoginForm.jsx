import SignIn from './SignIn';
import SignUp from './SignUp';

const LoginForm = ({ containerState, overlayState, switchContainerState }) => {
  const isSignIn = containerState === 'sign-in';
  const isSignUp = containerState === 'sign-up';

  return (
    <div className={`container ${overlayState ? 'overlay-active' : ''}`}>
      <div className="form-container">
        {isSignIn && <SignIn />}
        {isSignUp && <SignUp />}
      </div>
      <div className="overlay-container" onClick={switchContainerState}>
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>З поверненням!</h1>
            <p>
              Щоб залишатися з нами, будь ласка, увійдіть до вашого аккаунта
            </p>
            <button className="btn">Увійти</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Привіт, друг!</h1>
            <p>Введіть свої особисті дані і почніть подорож з нами</p>
            <button className="btn">Зареєструватися</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

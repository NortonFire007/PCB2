const SignIn = () => {
  return (
    <div className="form-container sign-in-container">
      <form className="form">
        <h1>Увійти</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>або використовуйте свій обліковий запис</span>
        <div className="input-group">
          <input type="email" placeholder="Електронна пошта" />
          <i className="fas fa-envelope" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Пароль" />
          <i className="fas fa-lock" />
        </div>
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default SignIn;

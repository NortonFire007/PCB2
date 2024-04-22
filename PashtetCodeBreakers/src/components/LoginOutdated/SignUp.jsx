const SignUp = () => {
  return (
    <div className="form-container sign-up-container">
      <form className="form">
        <h1>Зареєструватися</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>або використовуйте свою електронну пошту для реєстрації</span>
        <div className="input-group">
          <input type="text" placeholder="Ім'я" />
          <i className="fas fa-user" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Прізвище" />
          <i className="fas fa-user-circle" />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email" />
          <i className="fas fa-envelope" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Пароль" />
          <i className="fas fa-lock" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Підтвердіть пароль" />
          <i className="fas fa-key" />
        </div>
        <div className="input-group">
          <input type="tel" placeholder="Номер телефону" />
          <i className="fas fa-phone-alt" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Місто" />
          <i className="fas fa-city" />
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default SignUp;

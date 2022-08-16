import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({handleRegister}) => {
  const [data, setData] = useState({
    password: '',
    email: '' 
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let {password, email} = data;
    handleRegister(password, email);
  }
  return(
    <div className="register">
      <div className="register__content">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          method="POST"
          name="register"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="url"
            id="email"
            name="email"
            className="register__input"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <span id="register-error" className="register__error"></span>

          <input
            type="password"
            id="pass"
            name="password"
            className="register__input"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            required
          />
          <span id="register-error" className="register__error"></span>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__login">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;
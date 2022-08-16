/* import useValidationForms from '../hooks/useValidationForms'; */
import { useState } from "react";

const Login = ({handleLogin}) => {
  /*  const {handleChange, errors, isValid, resetError} = useValidationForms(); */
  const [data, setData] = useState({
    password: '',
    email: '' 
  });
  const [message, setMessage] = useState('');

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
    handleLogin(password, email);
  }
  return (
    <div className="register">
      <div className="register__content">
        <h2 className="register__title">Вход</h2>
        <form
          className="register__form"
          method="POST"
          name="register"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="url"
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
            name="password"
            className="register__input"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            required
          />
          <span id="register-error" className="register__error"></span>
          <button type="submit" className="register__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

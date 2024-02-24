import {Link, Navigate, useNavigate} from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "./Input";
import useForm from "../../hooks/useForm";

function Login({ onLogin, success, isAuth }) {
  const { enteredValues, handleChange, isFormValid, resetForm, errors } = useForm();

  const navigate = useNavigate();


    if (isAuth) {
        navigate(-1)
        return null;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(enteredValues);
  };

  return (
    <section className="auth">
      <Link to="/">
        <img className="auth__logo link" src={logo} alt="Логотип"/>
      </Link>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            type="email"
            name="email"
            title="E-mail"
            minLength={6}
            onChange={handleChange}
            error={errors.email || ""}
            placeholder="Ваш email"
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={errors.password || ""}
            placeholder="Введите пароль"
            minLength={6}
            maxLenght={30}
          />
        </div>
      <button type="submit" className="auth__submit-login link" disabled={!isFormValid}>Войти</button>
        <div className="auth__link-container">
          <p className="color-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;

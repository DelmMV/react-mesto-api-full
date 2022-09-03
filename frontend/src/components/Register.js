import * as auth from "../utils/auth.js";
import React from "react";

function Register({ handleRegister }) {
  const [data, setData] = React.useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = data;
    handleRegister(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="login__input"
          placeholder="Email"
          onChange={handleChange}
          value={data.email}
          required
        />
        <input
          name="password"
          type="password"
          className="login__input"
          placeholder="Пароль"
          onChange={handleChange}
          value={data.password}
          required
        />
        <button type="submit" className="login__submit">
          Зарегистрироваться
        </button>
        <span className="login__span">Уже зарегистрированы? Войти</span>
      </form>
    </div>
  );
}

export default Register;

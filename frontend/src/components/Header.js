import logo from "../images/Vector.svg";

function Header({ location, isLoggedIn, goTo }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <p className="header__email">
        {isLoggedIn ? localStorage.getItem("email") : ""}
      </p>
      <button href="#" className="header__button" onClick={goTo}>
        {location === "/"
          ? "Выйти"
          : location === "/sign-up"
          ? "Войти"
          : "Регистрация"}
      </button>
    </header>
  );
}

export default Header;

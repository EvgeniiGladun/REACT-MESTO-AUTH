import React from "react";
import { NavLink, Route } from "react-router-dom";

import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <a href="./">
        <img src={logo} alt="Логотип MESTO" className="logo" />
      </a>
      <nav className="header__menu">
        {props.loggedIn ? (
          <h4 className="header__user-email">email@mail.com</h4>
        ) : (
          ""
        )}
        <Route path={"/sign-up"}>
          <NavLink className="header__link" to="sign-in">
            Войти
          </NavLink>
        </Route>
        <Route path={"/sign-in"}>
          <NavLink className="header__link" to="sign-up">
            Зарегистрироваться
          </NavLink>
        </Route>
        <Route exact path={"/"}>
          <NavLink className="header__link" to="sign-in">
            Выйти
          </NavLink>
        </Route>
      </nav>
    </header>
  );
}

export default Header;

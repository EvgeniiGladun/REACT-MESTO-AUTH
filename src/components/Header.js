import React from "react";
import { useState } from "react";
import { Link, NavLink, Route, useHistory } from "react-router-dom";

import logo from "../images/logo.svg";
import menuOpen from "../images/menu-icon/menu-open.svg";
import menuClose from "../images/menu-icon/menu-close.svg";

function Header(props) {

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 320;

  const history = useHistory();
  const [navigationMenu, setNavigationMenu] = useState(false);

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const outSite = () => {
    localStorage.removeItem('jwt');
    setNavigationMenu(false);
    history.push('/sign-in');
  }

  if (width <= breakpoint) {
    return (
      <>
        {navigationMenu ? <div className="header__container">
          <div className="header__menu-info">
            <h4 className="header__user-email">{props.emailUser}</h4>
            <button onClick={outSite} className="header__link">
              Выйти
            </button>
          </div>
        </div> : ''}

        <header className="header">
          <Link to={'/'}>
            <img src={logo} alt="Логотип MESTO" className="logo" />
          </Link>

          <Route path={"/sign-up"}>
            <nav className="header__menu">
              <NavLink className="header__link" to="sign-in">
                Войти
              </NavLink>
            </nav>
          </Route>

          <Route path={"/sign-in"}>
            <nav className="header__menu">
              <NavLink className="header__link" to="sign-up">
                Регистрация
              </NavLink>
            </nav>
          </Route>

          <Route exact path={"/"}>
            <nav className="header__menu header__menu_login">
              <h4 className="header__user-email">{props.emailUser}</h4>
              <button onClick={outSite} className="header__link">
                Выйти
              </button>
            </nav>

            <img className="header__menu-btn" onClick={() => { setNavigationMenu(!navigationMenu) }} src={navigationMenu ? menuClose : menuOpen} alt="" />
          </Route>
        </header>
      </>
    );
  }
  return (
    <header className="header">
      <Link to={'/'}>
        <img src={logo} alt="Логотип MESTO" className="logo" />
      </Link>

      <Route path={"/sign-up"}>
        <nav className="header__menu">
          <NavLink className="header__link" to="sign-in">
            Войти
          </NavLink>
        </nav>
      </Route>

      <Route path={"/sign-in"}>
        <nav className="header__menu">
          <NavLink className="header__link" to="sign-up">
            Регистрация
          </NavLink>
        </nav>
      </Route>

      <Route exact path={"/"}>
        <nav className="header__menu header__menu_login">
          <h4 className="header__user-email">{props.emailUser}</h4>
          <button onClick={outSite} className="header__link">
            Выйти
          </button>
        </nav>

        <img className="header__menu-btn" onClick={() => { setNavigationMenu(!navigationMenu) }} src={navigationMenu ? menuClose : menuOpen} alt="" />
      </Route>
    </header>);
}

export default Header;

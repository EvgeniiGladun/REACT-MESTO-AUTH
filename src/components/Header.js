import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="./">
        <img src={logo} alt="Логотип MESTO" className="logo" />
      </a>
    </header>
  );
}

export default Header;

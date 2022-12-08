import React from "react";

// История перемещения
import { Link, useHistory } from "react-router-dom";

function Register({ booleanRequestStatus, ...props }) {
  const history = useHistory();
  const [userDataUp, setUserDataUp] = React.useState({
    email: "",
    password: "",
  });

  // История перемещения
  // const handleHistory = () => {
  //   history.push('/sign-in');
  // }

  const handleBooleanValue = (booleanValue) => {
    booleanRequestStatus(booleanValue);
  };

  // Обработка полей формы, забираем данные
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserDataUp({
      ...userDataUp,
      [name]: value,
    });
  };

  // Обработка регистарицй пользователя
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!userDataUp.password) {
      return;
    }
    const { email, password } = userDataUp;
    props.auth
      .setRegisterUser(email.toLowerCase(), password)
      .then((res) => {
        if (res) {
          handleBooleanValue(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        handleBooleanValue(false);
        return console.log(err);
      });
  }

  return (
    <section className="sign sign-up">
      <div className="sign__container">
        <h2 className="sign__title">Регистрация</h2>

        <form
          onSubmit={handleSubmit}
          className="sign__form sign__form-registration"
          action="formRegistration"
          name="formRegistration"
          noValidate
        >
          <input
            onChange={handleChange}
            className="sign__text sign__text-registration-email"
            id="email-registration-input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <div className="sign__text-block">
            <span className="sign__text-error email-input-error"></span>
          </div>
          <input
            onChange={handleChange}
            className="sign__text sign__text-registration-password"
            id="password-registration-input"
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <div className="sign__text-block">
            <span className="sign__text-error password-input-error"></span>
          </div>

          <button
            className="sign__actions sign-entrance__actions sign__actions_disabled"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <p className="sign__text sign__text-registration">
            Уже зарегистрированы? <Link to={"sign-in"}>Войти</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;

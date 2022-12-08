import React from "react";

function Login({ booleanRequestStatus, handleLoggedIn, ...props }) {
  const [userDataIn, setUserDataIn] = React.useState({
    email: "",
    password: "",
  });

  const handleBooleanValue = (booleanValue) => {
    booleanRequestStatus(booleanValue);
  };

  const handleLogged = (evt) => {
    handleLoggedIn(evt);
  };

  // Обработка полей формы, забираем данные
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserDataIn({
      ...userDataIn,
      [name]: value,
    });
  };

  // Обработка регистарицй пользователя
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!userDataIn.password) {
      return;
    }
    const { email, password } = userDataIn;
    props.auth
      .setAuthorizeUser(email.toLowerCase(), password)
      .then((data) => {
        if (data.token) {
          setUserDataIn({
            email: "",
            password: "",
          });
          handleLogged(evt);
          // props.history.push('/');
          return data;
        }
      })
      .catch((err) => {
        handleBooleanValue(false);
        return console.log(err);
      });
  }

  return (
    <section className="sign sign-in">
      <div className="sign__container">
        <h2 className="sign__title">Вход</h2>

        <form
          onSubmit={handleSubmit}
          className="sign__form sign__form-entrance"
          action="formEntrance"
          name="formEntrance"
          noValidate
        >
          <input
            onChange={handleChange}
            className="sign__text sign__text-entrance-email"
            id="email-entrance-input"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={""}
            required
          />
          <div className="sign__text-block">
            <span className="sign__text-error email-input-error"></span>
          </div>
          <input
            onChange={handleChange}
            className="sign__text sign__text-entrance-password"
            id="password-entrance-input"
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
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

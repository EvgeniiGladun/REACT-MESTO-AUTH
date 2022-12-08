import { userContex } from "../contexts/CurrentUserContext";

import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(userContex);
  const [values, setValues] = React.useState({});

  // Присваиваем стейт-переменным данные пользователя с API
  React.useEffect(() => {
    setValues({
      name: currentUser ? currentUser.name : "",
      about: currentUser ? currentUser.about : "",
    });
  }, [currentUser, props.isOpenEditProfile]);

  // Обработка полей формы, забираем данные
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(values);
  }

  return (
    <div onSubmit={handleSubmit}>
      <PopupWithForm
        isOpen={props.isOpenEditProfile}
        title="Редактировать профиль"
        buttonText={props.btnText}
        name="edit"
        onClose={props.onClose}
      >
        <input
          id="name-input"
          className="popup__text popup__text_user_name"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name || ""}
          required
        />
        <div className="popup__text-block">
          <span className="popup__text-error name-input-error"></span>
        </div>
        <input
          id="specialty-input"
          className="popup__text popup__text_user_specialty"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          placeholder="Вид деятельности"
          onChange={handleChange}
          value={values.about || ""}
          required
        />
        <div className="popup__text-block">
          <span className="popup__text-error specialty-input-error"></span>
        </div>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;

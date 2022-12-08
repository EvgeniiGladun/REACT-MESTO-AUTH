import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  // Создаем реф 'указатель'
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    // Убираем поведение браузера по умолчанию
    evt.preventDefault();

    // Передаем ссылку на новую аватарку
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    // Оставляем пустое поле после отправки
    avatarRef.current.value = "";
  }

  return (
    <div onSubmit={handleSubmit}>
      <PopupWithForm
        isOpen={props.isOpen}
        title="Обновить аватар"
        buttonText={props.btnText}
        name="avatar"
        onClose={props.onClose}
      >
        <input
          ref={avatarRef}
          id="avatar-input"
          className="popup__text popup__text-link"
          type="url"
          name="link"
          placeholder="Ссылка на аватар"
          required
        />
        <div className="popup__text-block">
          <span className="popup__text-error avatar-input-error"></span>
        </div>
      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;

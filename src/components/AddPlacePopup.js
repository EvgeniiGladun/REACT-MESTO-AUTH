import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardTitleRef = React.useRef();
  const cardLinkRef = React.useRef();

  React.useEffect(() => {
    cardTitleRef.current.value = "";
    cardLinkRef.current.value = "";
  }, [props.isOpenAddPlace]);

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      title: cardTitleRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  return (
    <div onSubmit={handleAddPlaceSubmit}>
      <PopupWithForm
        isOpen={props.isOpenAddPlace}
        title="Новое место"
        buttonText={props.btnText}
        name="add"
        onClose={props.onClose}
      >
        <input
          ref={cardTitleRef}
          id="title-input"
          className="popup__text popup__text-title"
          type="text"
          name="name"
          placeholder="Название публикаций"
          minLength="2"
          maxLength="30"
          required
        />
        <div className="popup__text-block">
          <span className="popup__text-error title-input-error"></span>
        </div>
        <input
          ref={cardLinkRef}
          id="link-input"
          className="popup__text popup__text-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <div className="popup__text-block">
          <span className="popup__text-error link-input-error"></span>
        </div>
      </PopupWithForm>
    </div>
  );
}

export default AddPlacePopup;

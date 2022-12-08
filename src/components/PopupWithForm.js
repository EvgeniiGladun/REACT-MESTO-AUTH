import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="reset"
        ></button>
        <h2 className="popup__title">{props.title}</h2>

        <form className="popup__form">
          {props.children}
          <button className="popup__save" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;

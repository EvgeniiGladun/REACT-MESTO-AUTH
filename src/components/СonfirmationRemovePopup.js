import React from "react";
import PopupWithForm from "./PopupWithForm";

function СonfirmationRemovePopup(props) {
  function handleConfirmSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete(props.card);
  }

  return (
    <div onSubmit={handleConfirmSubmit}>
      <PopupWithForm
        isOpen={props.isOpenСonfirmation}
        title="Вы уверены?"
        buttonText={props.btnText}
        name="confirm"
        onClose={props.onClose}
      />
    </div>
  );
}

export default СonfirmationRemovePopup;

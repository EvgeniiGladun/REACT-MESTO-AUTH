import React from "react";
import successfully from "../images/authorization/successfully.svg";
import unsuccessful from "../images/authorization/unsuccessful.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup-info-tool-tip ${props.isOpenInfoTooltip ? "popup_opened" : ""
        }`}
    >
      <div className="popup__container popup__container-status">
        <button
          onClick={props.onClose}
          className="popup__close"
          type="reset"
        ></button>

        <div className="popup__request-status">
          <img
            className="popup__status-icon"
            src={props.isRequestStatus ? successfully : unsuccessful}
          />
          <h2 className="popup__title popup__title-status">
            {props.isRequestStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;

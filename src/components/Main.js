import { userContex } from "../contexts/CurrentUserContext";

import React from "react";
import avatar from "../images/avatar/image.jpg";
import imgBtnEdit from "../images/edit-button/edit-button.svg";
import Card from "./Сard";

function Main(props) {
  const userData = React.useContext(userContex);

  return (
    <>
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__avatar-edit">
          <img
            src={userData ? userData.avatar : avatar}
            alt="Фото профиля"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__edit-user">
            <h1 className="profile__name">
              {userData ? userData.name : "Loading..."}
            </h1>

            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              aria-label="Edit"
              type="button"
            >
              <img
                className="profile__edit-img"
                src={imgBtnEdit}
                alt="Кнопка редактирования профиля"
              />
            </button>
          </div>
          <h2 className="profile__specialty">
            {userData ? userData.about : "Loading..."}
          </h2>
        </div>

        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          aria-label="Add"
          type="button"
        ></button>
      </section>

      <section className="card">
        {props.arrCards.map(({ ...card }) => (
          <Card
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardConfirm={props.onСonfirmationRemove}
            card={card}
            key={card._id}
            {...card}
          />
        ))}
      </section>
    </>
  );
}

export default Main;

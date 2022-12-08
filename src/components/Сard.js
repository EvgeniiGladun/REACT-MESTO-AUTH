import React from "react";
import { userContex } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardConfirm }) {
  const cardTag = {
    img: card.link,
    title: card.name,
    like: card.likes.length,
    likeId: card.likes || [],
    idCard: card._id,
    ownerCard: card.owner,
  };
  const currentUser = React.useContext(userContex);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const checkLike = cardTag.likeId.some(
    (cardLike) => cardLike._id === currentUser._id
  );
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardTag.ownerCard._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__rectangle-like ${
    checkLike ? "card__rectangle-like_active" : "card__rectangle-like"
  }`;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__rectangle-remove ${
    isOwn ? "card__rectangle-remove" : "card__rectangle-remove_hide"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardConfirm() {
    onCardConfirm(card);
  }

  return (
    <div className="card__cards">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleCardConfirm}
        type="button"
      ></button>
      <img
        onClick={handleClick}
        className="card__image"
        src={cardTag.img}
        alt={cardTag.title}
      />

      <div className="card__discription">
        <h2 className="card__title">{cardTag.title}</h2>

        <div className="card__block-actions">
          <div className="card__like">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <p className="card__quantity-like">{cardTag.like}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

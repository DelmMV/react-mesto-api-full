import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "" : "element__delete_noDelete"
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <div
        className="element__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__signature">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__heart_counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;

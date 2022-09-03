import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <button
          className="profile__edit-photo"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__data">
            <h1 id="name" className="profile__name">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__button"
              onClick={onEditProfile}
            />
          </div>
          <p id="job" className="profile__profession">
            {currentUser.about}
          </p>
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace} />
      </section>
      <section className="photo-grid" aria-label="Фото мест">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </>
  );
}

export default Main;

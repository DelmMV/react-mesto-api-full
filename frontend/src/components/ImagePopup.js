function ImagePopup({ card, onClose }) {
  return (
    <div
      id="popupImage"
      className={
        card
          ? "popup popup_image_opacity popup_opened"
          : "popup popup_image_opacity"
      }
    >
      <div className="popup__container popup__container_image">
        <button
          id="closeImage"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

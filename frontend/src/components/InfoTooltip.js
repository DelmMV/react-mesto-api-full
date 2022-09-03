function InfoTooltip({ title, onClose, isOpen, image }) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"}>
      <div className="info__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <img className="info__image" src={image} alt="Логотип Место"></img>
        <p className="info__header">{title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;

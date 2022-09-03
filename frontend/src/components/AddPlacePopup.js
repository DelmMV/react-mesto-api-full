import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [onClose]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"popupAdd"}
      isOpen={isOpen}
      onClose={onClose}
      typeForm={"add"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="place"
        type="text"
        className="popup__input popup__input_type_nameCard"
        placeholder="Название"
        onChange={handleChangeName}
        value={name}
        required
      />
      <span
        className="popup__error popup__error_position_place"
        id="place-error"
      ></span>
      <input
        id="link"
        type="url"
        className="popup__input popup__input_type_linkCard"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        required
      />
      <span
        className="popup__error popup__error_position_link"
        id="link-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

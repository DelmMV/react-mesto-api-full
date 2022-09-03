import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"popupProfile"}
      isOpen={isOpen}
      onClose={onClose}
      typeForm={"profile"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="nameInput"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        value={name ?? ""}
        onChange={handleChangeName}
        required
      />
      <span
        className="popup__error popup__error_position_name"
        id="nameInput-error"
      ></span>
      <input
        id="jobInput"
        type="text"
        className="popup__input popup__input_type_job"
        placeholder="Профессиональная деятельность"
        value={description ?? ""}
        onChange={handleChangeDescription}
        required
      />
      <span
        className="popup__error popup__error_position_job"
        id="jobInput-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

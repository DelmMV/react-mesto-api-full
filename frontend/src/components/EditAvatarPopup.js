import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"popupEditPhoto"}
      isOpen={isOpen}
      onClose={onClose}
      typeForm={"photo"}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="linkPhoto"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span
        className="popup__error popup__error_position_linkPhoto"
        id="linkPhoto-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

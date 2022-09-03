function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  typeForm,
  buttonText,
  onSubmit,
}) {
  return (
    <div id={name} className={isOpen ? "popup popup_opened" : "popup"}>
      <div
        className={
          typeForm === "delete"
            ? "popup__container"
            : "popup__container popup__container_delete"
        }
      >
        <button
          id="closeDelete"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className="popup__header">{title}</h2>
        <form
          id={`${typeForm}-form profile-form`}
          name={`${typeForm}-form profile-form`}
          className={`popup__form popup__${typeForm}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={
              typeForm === "delete"
                ? "popup__submit popup__submit_delete"
                : "popup__submit"
            }
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  buttonText = "Save",
  onSubmit,
  onClose,
  textModal = "signup",
}) {
  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__content">
        <button  className="modal__close-button"type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form
          className="modal__form"
          onSubmit={onSubmit}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
          <button className="modal__button" type="submit">
            {buttonText}
          </button>
          <button className="modal__signup-button" type="button" onClick={onClose} aria-label="Switch to sign up">
           {textModal} 
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

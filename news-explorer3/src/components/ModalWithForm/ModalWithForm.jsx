import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  buttonText = "Save",
  onSubmit,
  onClose,
  switchText,
  onSwitch,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
          aria-label="Close"

        >
        </button>
        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button className="modal__button" type="submit">
            {buttonText}
          </button>
          {switchText && onSwitch && (
            <button
              className="modal__switch-button"
              type="button"
              onClick={onSwitch}
            >
              {switchText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

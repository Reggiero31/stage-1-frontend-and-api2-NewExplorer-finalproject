import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  authError,
  onSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onRegister(email.trim(), password, username.trim());
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Sign in"
      onSwitch={onSwitchToLogin}
    >
      <div className="modal__field">
        <label className="modal__content-label" htmlFor="register-email">
          Email
        </label>
        <input
          className="modal__content-input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "register-email-error" : undefined}
        />
        {errors.email && (
          <p className="modal__error" id="register-email-error">
            {errors.email}
          </p>
        )}
      </div>
      <div className="modal__field">
        <label className="modal__content-label" htmlFor="register-password">
          Password
        </label>
        <input
          className="modal__content-input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "register-password-error" : undefined
          }
        />
        {errors.password && (
          <p className="modal__error" id="register-password-error">
            {errors.password}
          </p>
        )}
      </div>
      <div className="modal__field">
        <label className="modal__content-label" htmlFor="register-username">
          Username
        </label>
        <input
          className="modal__content-input"
          id="register-username"
          name="username"
          type="text"
          placeholder="Enter your username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          aria-invalid={Boolean(errors.username)}
          aria-describedby={
            errors.username ? "register-username-error" : undefined
          }
        />
        {errors.username && (
          <p className="modal__error" id="register-username-error">
            {errors.username}
          </p>
        )}
      </div>
      {authError && (
        <p className="modal__error modal__error--form" role="alert">
          {authError}
        </p>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;

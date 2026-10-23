import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  authError,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onLogin(email.trim(), password);
    }
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Sign up"
      onSwitch={onSwitchToRegister}
    >
      <div className="modal__field">
        <label className="modal__content-label" htmlFor="login-email">
          Email
        </label>
        <input
          className="modal__content-input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        {errors.email && (
          <p className="modal__error" id="login-email-error">
            {errors.email}
          </p>
        )}
      </div>
      <div className="modal__field">
        <label className="modal__content-label" htmlFor="login-password">
          Password
        </label>
        <input
          className="modal__content-input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "login-password-error" : undefined
          }
        />
        {errors.password && (
          <p className="modal__error" id="login-password-error">
            {errors.password}
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

export default LoginModal;

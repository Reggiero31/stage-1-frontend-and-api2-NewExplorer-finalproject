import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  authError,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (!isOpen) return null;
  return (
    <ModalWithForm
      textModal="signup"
      title="Sign in"
      buttonText="Sign in"
      onClose={onClose}
      onSubmit={(event) => {
        event.preventDefault();
        onLogin(email, password);
      }}
    >
      <label
        className="modal__content-label"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="modal__content-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label
        className="modal__content-label"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="modal__content-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {authError && <p>{authError}</p>} 
      
    </ModalWithForm>
  );
}

export default LoginModal;

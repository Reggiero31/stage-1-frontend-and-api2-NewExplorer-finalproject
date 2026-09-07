import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, username, onLogin, onLogout }) {
  return (
    <header className="header">
      <Navigation
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;

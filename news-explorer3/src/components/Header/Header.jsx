import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header({ isLoggedIn, username, onLogin, onLogout }) {
  const isSavedNews = useLocation().pathname === "/saved-news";

  return (
    <header className={`header${isSavedNews ? " header--saved" : ""}`}>
      <Navigation
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={onLogin}
        onLogout={onLogout}
        isSavedNews={isSavedNews}
      />
    </header>
  );
}

export default Header;

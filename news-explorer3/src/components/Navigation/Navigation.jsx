import { Link } from "react-router-dom";
import "./Navigation.css";
import { useState } from "react";

function Navigation({ isLoggedIn, username, onLogin, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="navigation" aria-label="Primary navigation">
      <div className="nav1">
        <h1>News Explorer</h1>
        <button
          className="navigation-icon"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navigation-menu"
          onClick={() => setIsMenuOpen((previouslyOpen) => !previouslyOpen)}
        />
      </div>

      <div
        id="navigation-menu"
        className={isMenuOpen ? "nav2 nav2--open" : "nav2"}
      >
        <Link className="navigation__link" to="/">
          Home
        </Link>
        {isLoggedIn && (
          <Link className="navigation__link" to="/saved-news">
            Saved articles
          </Link>
        )}
        {isLoggedIn ? (
          <button
            className="navigation__button"
            type="button"
            onClick={onLogout}
          >
            {username || "Sign out"}
          </button>
        ) : (
          <button
            className="navigation__button"
            type="button"
            onClick={onLogin}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

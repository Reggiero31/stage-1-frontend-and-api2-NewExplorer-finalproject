import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useState } from "react";

function Navigation({ isLoggedIn, username, onLogin, onLogout, isSavedNews }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`navigation${isSavedNews ? " navigation--saved" : ""}${
        isMenuOpen ? " navigation--menu-open" : ""
      }`}
      aria-label="Primary navigation"
    >
      <div className="nav1">
        <h1>News Explorer</h1>
        <button
          className="navigation-icon"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navigation-menu"
          onClick={() => setIsMenuOpen((previouslyOpen) => !previouslyOpen)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="navigation-menu"
        className={isMenuOpen ? "nav2 nav2--open" : "nav2"}
      >
        <NavLink
          className="navigation__link"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className="navigation__link"
            to="/saved-news"
            onClick={() => setIsMenuOpen(false)}
          >
            Saved articles
          </NavLink>
        )}
        {isLoggedIn ? (
          <button
            className="navigation__button"
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onLogout();
            }}
          >
            {username || "Sign out"}
          </button>
        ) : (
          <button
            className="navigation__button"
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onLogin();
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

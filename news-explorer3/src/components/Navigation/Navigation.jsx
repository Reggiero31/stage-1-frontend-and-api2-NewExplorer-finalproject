import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, username, onLogin, onLogout }) {
  return (
    <nav className="navigation" aria-label="Primary navigation">
      <div className="nav1">
        <h1>News Explorer</h1>
      </div>

      <div className="nav2">
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

import "./Navigation.css";

function Navigation({ isLoggedIn, username, onLogin, onLogout }) {
  return (
    <nav className="navigation" aria-label="Primary navigation">
      <div className="nav1">
        <h1>News Explorer</h1>
      </div>

      <div className="nav2">
        <a className="navigation__link" href="/">
          Home
        </a>
        {isLoggedIn && (
          <a className="navigation__link" href="/saved-news">
            Saved articles
          </a>
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

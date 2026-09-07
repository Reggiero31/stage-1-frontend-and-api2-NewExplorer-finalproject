import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import SearchForm from "./SearchForm/SearchForm";
import { searchNews } from "./utils/newsApi";
import "./App.css";
import Header from "./Header/Header";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import SavedNews from "./SavedNews/SavedNews";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("news-explorer-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [savedArticles, setSavedArticles] = useState(() =>
    JSON.parse(localStorage.getItem("news-explorer-saved") || "[]"),
  );
  const [activeModal, setActiveModal] = useState(null);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = Boolean(user);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setArticles([]);
    setVisibleCount(3);
    try {
      setArticles(await searchNews(query));
    } catch (requestError) {
      setError(
        requestError.message ||
          "Sorry, something went wrong during the request. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (article) => {
    if (!isLoggedIn) return;
    const isSaved = savedArticles.some((saved) => saved.url === article.url);
    const nextSaved = isSaved
      ? savedArticles.filter((saved) => saved.url !== article.url)
      : [...savedArticles, article];
    setSavedArticles(nextSaved);
    localStorage.setItem("news-explorer-saved", JSON.stringify(nextSaved));
  };

  const handleRegister = (email, password, username) => {
    const nextUser = { email, password, username };
    localStorage.setItem("news-explorer-account", JSON.stringify(nextUser));
    localStorage.setItem("news-explorer-user", JSON.stringify(nextUser));
    setUser(nextUser);
    setAuthError("");
    setActiveModal(null);
  };

  const handleLogin = (email, password) => {
    const account = JSON.parse(
      localStorage.getItem("news-explorer-account") || "null",
    );
    if (!account || account.email !== email || account.password !== password) {
      setAuthError("Invalid email or password.");
      return;
    }
    localStorage.setItem("news-explorer-user", JSON.stringify(account));
    setUser(account);
    setAuthError("");
    setActiveModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("news-explorer-user");
    setUser(null);
    navigate("/");
  };

  const openRegister = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const openLogin = () => {
    setAuthError("");
    setActiveModal("login");
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        username={user?.username}
        onLogin={openLogin}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              searchForm={<SearchForm onSearch={handleSearch} />}
              newsCards={articles}
              hasSearched={hasSearched}
              isLoading={isLoading}
              error={error}
              visibleCount={visibleCount}
              onShowMore={() => setVisibleCount((count) => count + 3)}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSave={handleSave}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              articles={savedArticles}
              onSave={handleSave}
              onRemove={handleSave}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
      {activeModal === "login" && (
        <LoginModal
          isOpen
          onClose={() => setActiveModal(null)}
          onLogin={handleLogin}
          authError={authError}
          onSwitchToRegister={openRegister}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          isOpen
          onClose={() => setActiveModal(null)}
          onRegister={handleRegister}
          authError={authError}
          onSwitchToLogin={openLogin}
        />
      )}
      <footer className="footer">
        News Explorer <span>© 2026</span>
      </footer>
    </div>
  );
}

export default App;

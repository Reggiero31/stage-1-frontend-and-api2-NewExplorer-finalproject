import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(trimmedQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="search-input">
        Find the latest news on any topic and save them in your personal account.
      </label>
      <div className="search-form__controls">
        <input
          id="search-input"
          className="search-form__input"
          type="text"
          placeholder="Enter a topic"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-invalid={Boolean(error)}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;

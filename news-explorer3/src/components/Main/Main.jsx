import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import About from "../About/About";

function Main({
  searchForm,
  newsCards = [],
  hasSearched,
  isLoading,
  error,
  visibleCount,
  onShowMore,
  isLoggedIn,
  savedArticles,
  onSave,
}) {
  const visibleArticles = newsCards.slice(0, visibleCount);
  return (
    <main className="main">
      <section className="main__intro">
        {" "}
        <h1 className="main__title">What's Going on In The World?</h1> {searchForm}{" "}
      </section>
      <section className="main__results" aria-label="News results">
        {isLoading && <Preloader />}
        {!isLoading && error && <p className="main__message">{error}</p>}
        {!isLoading && !error && newsCards.length === 0 && hasSearched && (
          <p className="main__message">Nothing Found</p>
        )}
        {!isLoading && !error && visibleArticles.length > 0 && (
          <div className="main__cards">
            {visibleArticles.map((article, index) => (
              <NewsCard
                key={`${article.url || article.title}-${index}`}
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved={savedArticles.some(
                  (saved) => saved.url === article.url,
                )}
                onSave={() => onSave(article)}
              />
            ))}
          </div>
        )}
        {!isLoading && visibleCount < newsCards.length && (
          <button
            className="main__show-more"
            type="button"
            onClick={onShowMore}
          >
            Show more
          </button>
        )}
      </section>
      <About />
    </main>
  );
}

export default Main;

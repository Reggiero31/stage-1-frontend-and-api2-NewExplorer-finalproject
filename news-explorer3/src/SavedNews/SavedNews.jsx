import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({
  articles = [],
  onSave,
  isLoggedIn,
  onRemove,
}) {
  return (
    <main className="saved-news">
      <section className="saved-news__content">
        <h2 className="saved-news__title">Saved News</h2>
        <p className="saved-news__subtitle">
          Here you can review articles you’ve saved for later reading.
        </p>
        {articles.length === 0 ? (
          <p className="saved-news__empty">
            You haven&apos;t saved any articles yet.
          </p>
        ) : (
          <button className="saved-news__clear-button" onClick={() => articles.forEach(article => onRemove(article))}>
            Clear All Saved Articles
          </button>
        )}
        {articles.length > 0 && (
          <div className="saved-news__cards">
            {articles.map((article) => (
              <NewsCard
                key={article.url || article.title}
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved
                onSave={() => onSave(article)}
                onRemove={() => onRemove(article)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SavedNews;

import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({
  articles = [],
  onSave,
  isLoggedIn,
  onRemove,
  onClear,
  username,
}) {
  const keywords = [
    ...new Set(articles.map((article) => article.keyword).filter(Boolean)),
  ];
  const visibleKeywords = keywords.slice(0, 2);
  const remainingKeywords = keywords.length - visibleKeywords.length;

  return (
    <main className="saved-news">
      <section className="saved-news__content">
        <p className="saved-news__eyebrow">Saved articles</p>
        <h1 className="saved-news__title">
          {username || "You"}, you have {articles.length} saved{" "}
          {articles.length === 1 ? "article" : "articles"}
        </h1>
        <p className="saved-news__subtitle">
          By keywords:{" "}
          {visibleKeywords.length > 0 ? (
            <strong>
              {visibleKeywords.join(", ")}
              {remainingKeywords > 0 && `, and ${remainingKeywords} other`}
            </strong>
          ) : (
            <span>none yet</span>
          )}
        </p>
        {articles.length === 0 ? (
          <p className="saved-news__empty">
            You haven&apos;t saved any articles yet.
          </p>
        ) : (
          <button
            className="saved-news__clear-button"
            type="button"
            onClick={onClear}
          >
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
                keyword={article.keyword}
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

import defaultCardImage from "../assets/images/card post.png";
import "./NewsCard.css";

function NewsCard({ article, isLoggedIn, isSaved, onSave, onRemove }) {
  const publicationDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const imageSrc = article.urlToImage || defaultCardImage;

  return (
    <article className="news-card">
      <div className="news-card__image-wrap">
        <img
          src={imageSrc}
          alt={article.title || "News article thumbnail"}
          className="news-card__image"
        />

        <div className="news-card__actions">
          <button
            className={`news-card__save ${isSaved ? "news-card__save_saved" : ""}`}
            type="button"
            onClick={() => onSave(article)}
           // disabled={!isLoggedIn}
            title={
              isLoggedIn
                ? isSaved
                  ? "Saved article"
                  : "Save article"
                : "Sign in to save articles."
            }
            aria-label={
              isLoggedIn ? "Save article" : "Sign in to save articles."
            }
          />
          {isSaved && onRemove && (
            <button
              className="news-card__remove"
              type="button"
              onClick={() => onRemove(article)}
              title="Remove saved article"
              aria-label="Remove saved article"
            />
          )}
        </div>
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{publicationDate}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">
          {article.description || "No description available."}
        </p>
        <p className="news-card__source">
          {article.source?.name || "Unknown source"}
        </p>
      </div>
    </article>
  );
}

export default NewsCard;

const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export async function searchNews(query) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_NEWS_API_KEY. Add it to the project .env file.");
  }

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const params = new URLSearchParams({
    q: query.trim(),
    apiKey,
    from: weekAgo.toISOString().slice(0, 10),
    to: today.toISOString().slice(0, 10),
    pageSize: "100",
  });

  const response = await fetch(`${newsApiBaseUrl}?${params}`);
  if (!response.ok) throw new Error("News request failed");

  const data = await response.json();
  if (data.status !== "ok")
    throw new Error(data.message || "News request failed");

  return data.articles || [];
}

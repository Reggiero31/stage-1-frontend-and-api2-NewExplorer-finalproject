const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

function getMockArticles(query) {
  const topic = (query || "news").trim();
  const currentDate = new Date().toISOString();

  return [
    {
      source: { name: "Demo News" },
      author: "Demo Desk",
      title: `${topic} update: key stories to watch this week`,
      description: `A local demo article about ${topic} so the save button can be tested in this workspace even without an API key.`,
      url: `https://example.com/${topic}-story-1`,
      urlToImage: "",
      publishedAt: currentDate,
    },
    {
      source: { name: "Demo News" },
      author: "Demo Desk",
      title: `${topic} explained: what changed and why it matters`,
      description: `This mock result shows how the app behaves when the news API is unavailable. You can save, remove, and review these cards locally.`,
      url: `https://example.com/${topic}-story-2`,
      urlToImage: "",
      publishedAt: currentDate,
    },
    {
      source: { name: "Demo News" },
      author: "Demo Desk",
      title: `${topic} briefing: the latest updates from the industry`,
      description: `This is a placeholder dataset used for development and UI testing until a real VITE_NEWS_API_KEY is added to your .env file.`,
      url: `https://example.com/${topic}-story-3`,
      urlToImage: "",
      publishedAt: currentDate,
    },
  ];
}

export async function searchNews(query) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return getMockArticles(query);
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

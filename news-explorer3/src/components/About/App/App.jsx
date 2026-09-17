import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import SearchForm from "../SearchForm/SearchForm";
import { searchNews } from "../../utils/newsApi";

function App() {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (query) => {
    try {
      const results = await searchNews(query);
      setArticles(results);
    } catch (error) {
      console.error("Search failed:", error);
      setArticles([]);
    }
  };


  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/stage-1-frontend-and-api2-NewExplorer-finalproject/"
          element={
            <Main
              searchForm={<SearchForm onSearch={handleSearch} />}
              newsCards={articles}
            />
          }
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
      <About />
      <Footer />
    </div>
  );
}

export default App;

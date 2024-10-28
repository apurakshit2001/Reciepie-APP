import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodNews.css';
import Slideshow from '../Restaurants/SLIDESHOW';

const FoodNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodNews = () => {
      axios
        .get("https://newsdata.io/api/1/news?apikey=pub_57596f0906858046af97cff87fbeef35c822e&q=food&country=in&language=en&category=food")
        .then(response => {
          setNews(response.data.results || []);
        })
        .catch(error => {
          setError("Error fetching food news. Please try again later.");
          console.error("Error fetching the food news:", error);
        });
    };

    fetchFoodNews();
  }, []);

  if (error) {
    return <p className="foodNews-error">{error}</p>;
  }

  return (
    <div className="foodNews-container">
        <Slideshow/>
      <h2 className="foodNews-title">Latest Food News</h2>
      <div className="foodNews-list">
        {news.map((article) => (
          <div key={article.article_id} className="foodNews-article">
            <h3 className="foodNews-articleTitle">{article.title}</h3>
            {article.image_url && <img src={article.image_url} alt={article.title} className="foodNews-image" />}
            <p className="foodNews-description">{article.description || "Description not available."}</p>
            <p className="foodNews-pubDate">Published on: {new Date(article.pubDate).toLocaleDateString()}</p>
            {article.creator && <p className="foodNews-creator">By: {article.creator.join(", ")}</p>}
            {article.keywords && <p className="foodNews-keywords"><strong>Keywords:</strong> {article.keywords.join(", ")}</p>}
            <p className="foodNews-source">
              <strong>Source:</strong> {article.source_name}
              <img src={article.source_icon} alt={article.source_name} className="foodNews-sourceIcon" />
            </p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="foodNews-link">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodNews;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HealthNews.css';
import Slideshow from '../Restaurants/SLIDESHOW';

const HealthNews = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://newsdata.io/api/1/news?apikey=pub_57596f0906858046af97cff87fbeef35c822e&q=food&country=in&language=en&category=health")
            .then(response => {
                setArticles(response.data.results);
            })
            .catch(error => {
                setError('Failed to fetch health news');
                console.error(error);
            });
    }, []);

    return (
        <div className="healthNews-container">
            <Slideshow />
            <h1 className="healthNews-title ">Health News</h1>
            {error ? (
                <p className="healthNews-error">{error}</p>
            ) : (
                <div className="healthNews-list">
                    {articles.map(article => (
                        <div key={article.article_id} className="healthNews-article ">
                            {article.image_url && (
                                <img src={article.image_url} alt={article.title} className="healthNews-image" />
                            )}
                            {
                                article.image_url ? (
                                    <h2 className="healthNews-articleTitle">{article.title}</h2>
                                ) : (
                                    <h2 className="healthNews-articleTitle" style={{ fontSize: '2.2rem' }}>{article.title}</h2>
                                )
                            }

                            {article.description && <p className="healthNews-description">{article.description}</p>}
                            <p className="healthNews-pubDate">Published: {new Date(article.pubDate).toLocaleDateString()}</p>
                            {article.creator && <p className="healthNews-creator">By: {article.creator.join(', ')}</p>}
                            {article.keywords && <p className="healthNews-keywords">Keywords: {article.keywords.join(', ')}</p>}
                            <div className="healthNews-source">
                                <span>Source: {article.source_name}</span>
                                {article.source_icon && <img src={article.source_icon} alt={`${article.source_name} icon`} className="healthNews-sourceIcon" />}
                            </div>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="healthNews-link">Read more</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HealthNews;

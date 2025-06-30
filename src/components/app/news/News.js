import React, { useEffect, useState } from 'react';
import '../news/News.css';

const categories = ['Money', 'Gold', 'Economics', 'Currency', 'Gas', 'RealEstate', 'MutualFunds', 'WorldWar', 'Investment'];
const sortChoices = ['Popularity', 'Relevancy', 'PublishedAt']; // Lowercase as per API spec
const lang = [
  { code: 'ar', name: 'Arabic' },
  { code: 'de', name: 'German' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'he', name: 'Hebrew' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ur', name: 'Urdu' },     
  { code: 'zh', name: 'Chinese' }
];



function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiQ, setApiQ] = useState({ topic: 'Money', sort: 'popularity', lang: 'en' });

  const runFetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = `https://newsapi.org/v2/everything?q=${apiQ.topic}&sortBy=${apiQ.sort}&language=${apiQ.lang}&apiKey=4cab290f2317457ca27697ed745166a5`;

      const res = await fetch(apiUrl, {
        headers: { 'Origin': window.location.origin },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runFetch();
  }, [apiQ]); // Re-fetch whenever topic or sort changes

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem'}}>
        <select
          value={apiQ.topic}
          onChange={(e) => setApiQ(prev => ({ ...prev, topic: e.target.value }))}
        >
          {categories.map((topic, idx) => (
            <option key={idx} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <select
          value={apiQ.sort}
          onChange={(e) => setApiQ(prev => ({ ...prev, sort: e.target.value.toLowerCase() }))}
        >
          {sortChoices.map((sort, idx) => (
            <option key={idx} value={sort}>
              {sort}
            </option>
          ))}
        </select>

        <select
          value={apiQ.lang}
          onChange={(e) => setApiQ(prev => ({ ...prev, lang: e.target.value }))}
        >
          {lang.map((sort, idx) => (
            <option key={idx} value={sort.code}>
              {sort.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ marginLeft: '1rem' }}>Loading news...</div>
      ) : error ? (
        <div style={{ marginLeft: '1rem' }}>Error loading news: {error}</div>
      ) : (
        <div className="newsComponent">
          {articles.length === 0 ? (
            <div>No news articles available</div>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="news-article">
                <h3>{article.title}</h3>
                <p>{article.description || "No description available."}</p>
                <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default News;

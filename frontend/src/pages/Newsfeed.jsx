import React, { useState, useEffect } from 'react';
import api from '../../config/axios';
import './NewsFeed.css';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  const fetchNews = async () => {
    try {
      const { data } = await api.get('/news', {
        params: {
          category,
          page,
          limit: 10
        }
      });
      setNews(prev => page === 1 ? data : [...prev, ...data]);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-feed">
      <h2>Krishi Samachar</h2>
      
      <div className="category-filters">
        <button
          className={category === 'all' ? 'active' : ''}
          onClick={() => setCategory('all')}
        >
          All News
        </button>
        <button
          className={category === 'market' ? 'active' : ''}
          onClick={() => setCategory('market')}
        >
          Market Updates
        </button>
        <button
          className={category === 'technology' ? 'active' : ''}
          onClick={() => setCategory('technology')}
        >
          Technology
        </button>
        <button
          className={category === 'policy' ? 'active' : ''}
          onClick={() => setCategory('policy')}
        >
          Policy Updates
        </button>
      </div>

      <div className="news-grid">
        {news.map(item => (
          <div key={item.id} className="news-card">
            <img src={item.image} alt={item.title} />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="news-meta">
                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                <span>{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
      
      <button
        className="load-more"
        onClick={() => setPage(prev => prev + 1)}
        disabled={loading}
      >
        Load More
      </button>
    </div>
  );
};

export default NewsFeed;
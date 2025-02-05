const { db } = require('../config/firebase');

const newsController = {
  async addNews(req, res) {
    try {
      const { title, content, category, language, images } = req.body;

      const newsData = {
        title,
        content,
        category,
        language,
        images,
        author: req.user.uid,
        publishedAt: new Date().toISOString(),
        views: 0,
        likes: 0
      };

      await db.collection('news').add(newsData);
      res.status(201).json({ message: 'News added successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getNews(req, res) {
    try {
      const { language, category, page = 1, limit = 10 } = req.query;
      
      let query = db.collection('news')
        .orderBy('publishedAt', 'desc');

      if (language) {
        query = query.where('language', '==', language);
      }
      if (category) {
        query = query.where('category', '==', category);
      }

      const snapshot = await query
        .limit(limit)
        .offset((page - 1) * limit)
        .get();

      const news = [];
      snapshot.forEach(doc => {
        news.push({ id: doc.id, ...doc.data() });
      });

      res.json(news);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = newsController;
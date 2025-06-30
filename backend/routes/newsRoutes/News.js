const express = require('express');
const router = express.Router();
const axios = require('axios');

// News API proxy route
router.get('/news', async (req, res) => {
  try {
    const apiKey = '4cab290f2317457ca27697ed745166a5';
    const country = req.query.country || 'us';
    
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);
    
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.response?.data || error.message 
    });
  }
});

module.exports = router; 
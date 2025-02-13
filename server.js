
// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Heroku will provide the correct port

// Middleware
app.use(cors());
app.use(express.json());

// NASA API key (store in .env)
const NASA_API_KEY = process.env.NASA_API_KEY;

// NASA API endpoints
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';
const NASA_EPIC_URL = 'https://api.nasa.gov/EPIC/api/natural';
const NASA_MEDIA_URL = 'https://images-api.nasa.gov/search';

// Route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the NASA API Media Server!');
});

// Route for APOD (Astronomy Picture of the Day)
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(NASA_APOD_URL, {
      params: { api_key: NASA_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch APOD data from NASA API' });
  }
});

// Route for EPIC (Earth Polychromatic Imaging Camera)
app.get('/api/epic', async (req, res) => {
  try {
    const response = await axios.get(NASA_EPIC_URL, {
      params: { api_key: NASA_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    res.status(500).json({ error: 'Failed to fetch EPIC data from NASA API' });
  }
});

// Route for NASA Media Library (Images and Videos)
app.get('/api/nasa-media', async (req, res) => {
  const query = req.query.query || '';
  try {
    const response = await axios.get(NASA_MEDIA_URL, {
      params: { q: query, media_type: 'image,video', api_key: NASA_API_KEY },
    });
    const items = response.data.collection.items;
    res.json({ collection: { items } });
  } catch (error) {
    console.error('Error fetching NASA media data:', error);
    res.status(500).json({ error: 'Failed to fetch media data from NASA API' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

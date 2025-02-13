const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000; // Heroku will provide the correct port

// Middleware
app.use(cors());
app.use(express.json());

// NASA API key (store in .env)
const NASA_API_KEY = process.env.NASA_API_KEY;

// NASA API endpoint for APOD (Astronomy Picture of the Day)
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

// Route for the root URL (Welcome page)
app.get('/', (req, res) => {
  res.send('Welcome to APOD Server!');
});

// Route for APOD (Astronomy Picture of the Day)
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(NASA_APOD_URL, {
      params: { api_key: NASA_API_KEY },
    });
    res.json(response.data); // Send the APOD data as JSON
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch APOD data from NASA API' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); // To access the API key securely

const app = express();
const port = 4000;

// NASA API endpoint
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

// Middleware to serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve the index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API route to fetch NASA APOD data
app.get('/api/apod', async (req, res) => {
    try {
        const response = await axios.get(NASA_API_URL, {
            params: {
                api_key: process.env.NASA_API_KEY, // API key from .env file
            },
        });
        res.json(response.data); // Send the APOD data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

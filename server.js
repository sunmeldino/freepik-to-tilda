const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: '*'  // Allow requests from any origin
}));

const API_KEY = 'FPSXd7d2fcb215b749f8956d59428fa1ee0f';  // Your Freepik API key

app.get('/generate-image-freepik', async (req, res) => {
    const query = req.query.query || "default";
    try {
        const response = await axios.get('https://api.freepik.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
            params: {
                q: query
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching image:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to generate image');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

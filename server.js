const express = require('express');
const app = express();
const jsonData = require('./data.json'); // Assuming your JSON data is in data.json file

// API endpoint to search based on type and query string
app.get('/search', (req, res) => {
    const { type, query } = req.query;

    if (!type || !query) {
        return res.status(400).json({ error: "Type and query parameters are required." });
    }

    // Filtering the jsonData based on type and query
    const filteredData = jsonData.filter(item => item.type === type && new RegExp(query, 'i').test(item.name));

    res.json(filteredData);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

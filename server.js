const express = require("express");
const app = express();
const cors = require("cors");
const professionsData = require("./professions.json");
const jsonData = require("./data.json"); // Assuming your JSON data is in data.json file

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// API endpoint to search based on type and query string
app.get("/search", (req, res) => {
  const { type, query } = req.query;

  if (!type || !query) {
    return res
      .status(400)
      .json({ error: "Type and query parameters are required." });
  }

  // Filtering the jsonData based on type and query
  const filteredData = jsonData.filter(
    (item) => item.type === type && new RegExp(query, "i").test(item.name)
  );

  res.json(filteredData);
});

app.get("/search-professions", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }
  // Filtering the professionsData based on the query
  const filteredProfessions = professionsData.filter((profession) =>
    profession.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredProfessions);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
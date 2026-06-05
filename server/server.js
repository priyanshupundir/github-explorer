const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");

const app = express();
const cache = new NodeCache({ stdTTL: 60 });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Explorer API is running");
});

app.get("/api/github/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const cacheKey = username.toLowerCase();

    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("Returning cached data");
      return res.json(cachedData);
    }

    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const repoResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const responseData = {
      user: userResponse.data,
      repos: repoResponse.data,
    };

    cache.set(cacheKey, responseData);

    res.json(responseData);
  } catch (error) {
    if (error.response?.status === 403) {
      return res.status(403).json({
        message: "GitHub API rate limit exceeded. Please try again later.",
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found",
      });
    }

    res.status(500).json({
      message: "Something went wrong while fetching GitHub data",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
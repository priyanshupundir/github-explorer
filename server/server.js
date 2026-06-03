const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Explorer API is running");
});

app.get("/api/github/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const repoResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    res.json({
      user: userResponse.data,
      repos: repoResponse.data
    });
  } catch (error) {
    res.status(404).json({
      message: "GitHub user not found"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
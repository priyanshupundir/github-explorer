import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/github/${username}`
      );

      setUser(response.data.user);
      setRepos(response.data.repos);
    } catch (error) {
      console.error(error);
      alert("User not found");
    }
  };

  return (
    <div>
      <h1>GitHub Explorer</h1>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {user && (
        <div>
          <h2>{user.name}</h2>
          <img src={user.avatar_url} alt={user.login} width="150" />
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Public Repos: {user.public_repos}</p>
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <h2>Repositories</h2>

          {repos.map((repo) => (
            <div key={repo.id}>
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
              <p>Language: {repo.language || "Not specified"}</p>
              <p>⭐ Stars: {repo.stargazers_count}</p>
              <p>Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
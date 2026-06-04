import { useState } from "react";
import axios from "axios";

import SearchForm from "./SearchForm";
import ErrorMessage from "./ErrorMessage";
import RepoCard from "./RepoCard";
import RepoFilters from "./RepoFilters";

const ProfileViewer = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    try {
      setLoading(true);
      setError("");
      setProfile(null);
      setRepos([]);

      const response = await axios.get(
        `http://localhost:5000/api/github/${username}`
      );

      setProfile(response.data.user);
      setRepos(response.data.repos);
    } catch {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") {
      return order === "asc"
        ? a.stargazers_count - b.stargazers_count
        : b.stargazers_count - a.stargazers_count;
    }

    if (sort === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sort === "updated") {
      return order === "asc"
        ? new Date(a.updated_at) - new Date(b.updated_at)
        : new Date(b.updated_at) - new Date(a.updated_at);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <SearchForm
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onSubmit={handleSearch}
        loading={loading}
        placeholder="Enter GitHub username"
      />

      <ErrorMessage message={error} />

      {profile && (
        <div className="bg-gray-800 rounded-xl p-6 mt-6">
          <div className="flex flex-col items-center">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-32 h-32 rounded-full mb-4"
            />

            <h2 className="text-3xl font-bold text-white">
              {profile.name || profile.login}
            </h2>

            <a 
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
              >
                View Github profile
              </a>

            <p className="text-gray-400 mt-2">
              {profile.bio || "No bio available"}
            </p>

            <div className="flex gap-6 mt-4 text-white">
              <span>Followers: {profile.followers}</span>
              <span>Following: {profile.following}</span>
              <span>Repos: {profile.public_repos}</span>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="mt-8">
          <RepoFilters
            sort={sort}
            order={order}
            onSortChange={setSort}
            onOrderChange={setOrder}
            disabled={loading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;
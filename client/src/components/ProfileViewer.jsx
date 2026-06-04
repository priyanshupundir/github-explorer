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

    if (!username.trim()) {
  setError("Please enter a GitHub username");
  return;
}

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
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6">
      <SearchForm
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onSubmit={handleSearch}
        loading={loading}
        placeholder="Enter GitHub username"
      />

      <ErrorMessage message={error} />

      {!profile && repos.length === 0 && !loading && (
  <div className="flex flex-col items-center justify-center text-center py-32">
    <div className="text-7xl mb-6">
      🐙
    </div>

    <h2 className="text-5xl font-bold text-[#c9d1d9] mb-4">
      Explore GitHub Users
    </h2>

    <p className="text-[#8b949e] text-lg max-w-2xl">
      Search for GitHub developers, explore their repositories,
      discover projects, and view profile statistics.
    </p>

    <div className="mt-10 flex gap-3 flex-wrap justify-center">
      <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-[#58a6ff]">
        React
      </span>

      <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-[#58a6ff]">
        Open Source
      </span>

      <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-[#58a6ff]">
        Developers
      </span>

      <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-[#58a6ff]">
        GitHub API
      </span>
    </div>
  </div>
)}

      {profile && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-32 h-32 rounded-full border border-[#30363d]"
            />

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#c9d1d9]">
               {profile.name || profile.login}
              </h2>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline mt-1 inline-block"
                >
                @{profile.login}
              </a>

              <p className="text-[#8b949e] mt-4 max-w-2xl">
               {profile.bio || "No bio available"}
              </p>
          </div>
        </div>

        <div className="border-t border-[#30363d] mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9d1d9]">
              {profile.public_repos}
            </p>
            <p className="text-[#8b949e]">Repositories</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9d1d9]">
              {profile.followers}
            </p>
            <p className="text-[#8b949e]">Followers</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-[#c9d1d9]">
               {profile.following}
            </p>
            <p className="text-[#8b949e]">Following</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
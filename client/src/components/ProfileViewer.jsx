import { useState } from "react";
import axios from "axios";
import {
  FaGithub,
  FaUsers,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";

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
    } catch (error) {
      setError(
        error.response?.data?.message || "something went wrong. Please try again"
      );
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
        placeholder="Search GitHub username..."
      />

      <ErrorMessage message={error} />

      {!profile && !loading && (
        <div className="flex flex-col items-center justify-center text-center py-32">
          <FaGithub className="text-8xl text-[#6e7681] mb-8" />

          <h2 className="text-4xl font-semibold text-[#f0f6fc] mb-4">
            Explore GitHub Users
          </h2>

          <p className="text-[#8b949e] text-lg max-w-xl">
            Enter a GitHub username to view their profile,
            repositories, and activity.
          </p>
        </div>
      )}

      {profile && (
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* LEFT SIDEBAR */}
          <aside>
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-64 h-64 rounded-full border border-[#30363d]"
            />

            <h2 className="text-2xl font-semibold text-[#f0f6fc] mt-4">
              {profile.name || profile.login}
            </h2>

            <p className="text-xl text-[#8b949e]">
              {profile.login}
            </p>

            <p className="text-[#c9d1d9] mt-4">
              {profile.bio || "No bio available"}
            </p>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-5 w-full border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] py-2 rounded-md font-medium transition"
            >
              View GitHub Profile
            </a>

            <div className="flex items-center gap-2 text-[#8b949e] mt-4">
              <FaUsers />
              <span>
                <strong className="text-[#f0f6fc]">
                  {profile.followers}
                </strong>{" "}
                followers ·{" "}
                <strong className="text-[#f0f6fc]">
                  {profile.following}
                </strong>{" "}
                following
              </span>
            </div>

            {profile.location && (
              <div className="flex items-center gap-2 text-[#8b949e] mt-3">
                <FaMapMarkerAlt />
                <span>{profile.location}</span>
              </div>
            )}

            {profile.blog && (
              <div className="flex items-center gap-2 text-[#8b949e] mt-3">
                <FaLink />

                <a
                  href={
                    profile.blog.startsWith("http")
                      ? profile.blog
                      : `https://${profile.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#58a6ff] hover:underline"
                >
                  {profile.blog}
                </a>
              </div>
            )}
          </aside>

          {/* RIGHT CONTENT */}
          <section>
            <div className="border-b border-[#30363d] mb-6">
              <button className="px-4 py-3 border-b-2 border-[#f78166] text-[#f0f6fc] font-medium">
                Repositories

                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#30363d] text-[#c9d1d9]">
                  {profile.public_repos}
                </span>
              </button>
            </div>

            <RepoFilters
              sort={sort}
              order={order}
              onSortChange={setSort}
              onOrderChange={setOrder}
              disabled={loading}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {sortedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;
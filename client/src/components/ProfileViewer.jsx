import { useState } from "react";
import axios from "axios";
import { FaGithub, FaUsers, FaMapMarkerAlt, FaLink } from "react-icons/fa";

import ErrorMessage from "./ErrorMessage";
import SearchForm from "./SearchForm";
import RepoCard from "./RepoCard";
import RepoFilters from "./RepoFilters";
import Pagination from "./Pagination";

const ProfileViewer = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const reposPerPage = 10;

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
      setCurrentPage(1);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/github/${username}`
      );

      setProfile(response.data.user);
      setRepos(response.data.repos);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
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

  const totalPages = Math.ceil(sortedRepos.length / reposPerPage);

  const currentRepos = sortedRepos.slice(
    (currentPage - 1) * reposPerPage,
    currentPage * reposPerPage
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] px-4 sm:px-6 py-6 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <SearchForm
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onSubmit={handleSearch}
          loading={loading}
          placeholder="Search GitHub username..."
        />

        <ErrorMessage message={error} />
      </div>

      {!profile && !loading && (
        <div className="flex flex-col items-center justify-center text-center py-32">
          <FaGithub className="text-8xl text-[#6e7681] mb-8" />

          <h2 className="text-4xl font-semibold text-[#f0f6fc] mb-4">
            Explore GitHub Users
          </h2>

          <p className="text-[#8b949e] text-lg max-w-xl">
            Enter a GitHub username to view their profile, repositories, and
            activity.
          </p>
        </div>
      )}

      {profile && (
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="text-center lg:text-left">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border border-[#30363d] mx-auto lg:mx-0"
            />

            <h2 className="text-2xl font-semibold text-[#f0f6fc] mt-4">
              {profile.name || profile.login}
            </h2>

            <p className="text-xl text-[#8b949e]">{profile.login}</p>

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

            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#8b949e] mt-4">
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
                  className="text-[#58a6ff] hover:underline break-all"
                >
                  {profile.blog}
                </a>
              </div>
            )}
          </aside>

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
              onSortChange={(value) => {
                setSort(value);
                setCurrentPage(1);
              }}
              onOrderChange={(value) => {
                setOrder(value);
                setCurrentPage(1);
              }}
              disabled={loading}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
              {currentRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 pb-24">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  loading={loading}
                />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfileViewer;

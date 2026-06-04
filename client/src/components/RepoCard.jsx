import { FaStar, FaClock, FaCodeBranch } from "react-icons/fa";
import { formatDate, formatNumber } from "../utils/format";

const RepoCard = ({ repo, showOwner = false, variant = "default" }) => {
  const isEnhanced = variant === "enhanced";

  const baseClasses = isEnhanced
  ? "bg-[#161b22] rounded-xl p-6 border border-[#30363d] hover:border-[#58a6ff] hover:translate-y-[-2px] transition-all duration-200"
  : "bg-[#161b22] rounded-xl p-6 border border-[#30363d] hover:border-[#58a6ff] hover:translate-y-[-2px] transition-all duration-200";

  const descriptionClamp = isEnhanced ? "line-clamp-3" : "line-clamp-2";

  return (
    <div className={baseClasses}>
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              {repo.full_name || repo.name}
            </a>
          </h3>

          {showOwner && repo.owner && (
            <p className="text-sm text-[#8b949e]">
              by {repo.owner.login}
            </p>
          )}
        </div>

        {repo.private && (
          <span className="ml-2 px-2 py-1 text-xs bg-yellow-600 text-white rounded">
            Private
          </span>
        )}
      </div>

      <p className={`text-[#8b949e] mb-4 ${descriptionClamp}`}>
        {repo.description || "No description available"}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-[#8b949e]">
        <span className="px-2 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9]">
        {repo.language || "Unknown"}
        </span>

        <span className="flex items-center gap-1">
          <FaStar />
          {formatNumber(repo.stargazers_count)}
        </span>

        <span className="flex items-center gap-1">
          <FaCodeBranch />
          {formatNumber(repo.forks_count)}
        </span>

        <span className="flex items-center gap-1">
          <FaClock />
          {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
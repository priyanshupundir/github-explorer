const SearchForm = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  loading,
  buttonText = "Search",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mt-8"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#161b22] border border-[#30363d] rounded-xl text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200"
      >
        {loading ? "Searching..." : buttonText}
      </button>
    </form>
  );
};

export default SearchForm;
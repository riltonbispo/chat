import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="h-10 rounded-2xl flex items-center justify-center pl-4 bg-white">
      <SearchIcon />
      <input
        type="search"
        placeholder="Placeholder"
        className="flex-1 outline-0 bg-transparent"
      />
    </div>
  );
};

export default Search;

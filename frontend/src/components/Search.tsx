import SearchLogo from '@/assets/search.svg?react';

const Search = () => {
  return (
    <div className="relative w-64">
      <SearchLogo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

      <input
        type="search"
        name="Buscar"
        id="Buscar"
        placeholder="Buscar"
        className="bg-white w-full h-9 pl-10 pr-3 rounded-4xl shadow-md focus:outline-none"
      />
    </div>
  );
};

export default Search;

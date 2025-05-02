import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useYouTube } from '../context/YouTubeContext';

const SearchBar: React.FC = () => {
  const { state, searchVideos } = useYouTube();
  const [localSearchQuery, setLocalSearchQuery] = useState(state.searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchVideos(localSearchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search videos..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1.5 px-2 py-1 rounded-full bg-red-600 text-white text-xs hover:bg-red-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
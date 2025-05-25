
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { searchMovies, Movie } from '../data/movies';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Movie[]>([]);
  const [myList, setMyList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedList = localStorage.getItem('netflix-my-list');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }

    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const searchResults = searchMovies(searchQuery);
    setResults(searchResults);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  const handleAddToList = (movie: Movie) => {
    const newList = [...myList, movie.id];
    setMyList(newList);
    localStorage.setItem('netflix-my-list', JSON.stringify(newList));
  };

  const handleRemoveFromList = (movieId: number) => {
    const newList = myList.filter(id => id !== movieId);
    setMyList(newList);
    localStorage.setItem('netflix-my-list', JSON.stringify(newList));
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Search</h1>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows, actors..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <SearchIcon className="h-6 w-6" />
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        )}

        {!isLoading && query && (
          <div className="mb-6">
            <p className="text-gray-300 text-lg">
              {results.length > 0 
                ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToList={handleAddToList}
                onRemoveFromList={handleRemoveFromList}
                isInList={myList.includes(movie.id)}
              />
            ))}
          </div>
        )}

        {!query && !isLoading && (
          <div className="text-center py-16">
            <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Start typing to search for content</p>
          </div>
        )}

        {!isLoading && query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">
              We couldn't find anything matching "{query}"
            </p>
            <p className="text-gray-500">
              Try searching for something else or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

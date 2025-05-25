
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getMoviesByType, Movie } from '../data/movies';

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [myList, setMyList] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating'>('title');
  const [filterGenre, setFilterGenre] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies(getMoviesByType('movie'));
      setLoading(false);
    }, 500);

    const savedList = localStorage.getItem('netflix-my-list');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }

    return () => clearTimeout(timer);
  }, []);

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

  const genres = ['all', ...Array.from(new Set(movies.flatMap(movie => movie.genre)))];

  const filteredAndSortedMovies = movies
    .filter(movie => filterGenre === 'all' || movie.genre.includes(filterGenre))
    .sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <LoadingSkeleton count={12} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">Movies</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'year' | 'rating')}
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {filteredAndSortedMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredAndSortedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToList={handleAddToList}
                onRemoveFromList={handleRemoveFromList}
                isInList={myList.includes(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;

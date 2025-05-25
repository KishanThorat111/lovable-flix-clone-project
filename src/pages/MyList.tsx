
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { movies, Movie } from '../data/movies';

const MyList = () => {
  const [myList, setMyList] = useState<number[]>([]);
  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedList = localStorage.getItem('netflix-my-list');
    if (savedList) {
      const listIds = JSON.parse(savedList);
      setMyList(listIds);
      
      const listMovies = movies.filter(movie => listIds.includes(movie.id));
      setMyMovies(listMovies);
    }
  }, []);

  const handleRemoveFromList = (movieId: number) => {
    const newList = myList.filter(id => id !== movieId);
    setMyList(newList);
    localStorage.setItem('netflix-my-list', JSON.stringify(newList));
    
    const newMovies = myMovies.filter(movie => movie.id !== movieId);
    setMyMovies(newMovies);
  };

  if (myMovies.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">My List</h1>
          
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">Your list is empty</p>
            <p className="text-gray-500">
              Add movies and TV shows to your list to watch them later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Heart className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-4xl font-bold text-white">My List</h1>
          <span className="ml-4 text-gray-400 text-lg">({myMovies.length} items)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {myMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemoveFromList={handleRemoveFromList}
              isInList={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;

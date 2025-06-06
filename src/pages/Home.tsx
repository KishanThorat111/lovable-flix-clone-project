
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useTheme } from '../contexts/ThemeContext';
import { movies, Movie, getMoviesByType } from '../data/movies';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState<number[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    
    // Load user's list from localStorage
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

  if (loading) {
    return (
      <>
        <LoadingSkeleton type="hero" />
        <LoadingSkeleton type="list" />
      </>
    );
  }

  const trendingMovies = movies.slice(0, 6);
  const newReleases = movies.slice(1, 7);
  const topRated = movies.sort((a, b) => b.rating - a.rating).slice(0, 6);
  const actionMovies = movies.filter(movie => movie.genre.includes('Action'));
  const dramas = movies.filter(movie => movie.genre.includes('Drama'));
  const sciFi = movies.filter(movie => movie.genre.includes('Sci-Fi'));

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <HeroSection 
        onAddToList={handleAddToList}
        onRemoveFromList={handleRemoveFromList}
        myList={myList}
      />
      
      <div className="relative z-10 -mt-32 space-y-12 pt-8">
        <MovieRow
          title="Trending Now"
          movies={trendingMovies}
          onAddToList={handleAddToList}
          onRemoveFromList={handleRemoveFromList}
          myList={myList}
        />
        
        <MovieRow
          title="New Releases"
          movies={newReleases}
          onAddToList={handleAddToList}
          onRemoveFromList={handleRemoveFromList}
          myList={myList}
        />
        
        <MovieRow
          title="Top Rated"
          movies={topRated}
          onAddToList={handleAddToList}
          onRemoveFromList={handleRemoveFromList}
          myList={myList}
        />
        
        {actionMovies.length > 0 && (
          <MovieRow
            title="Action & Adventure"
            movies={actionMovies}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            myList={myList}
          />
        )}
        
        {dramas.length > 0 && (
          <MovieRow
            title="Dramas"
            movies={dramas}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            myList={myList}
          />
        )}
        
        {sciFi.length > 0 && (
          <MovieRow
            title="Sci-Fi"
            movies={sciFi}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            myList={myList}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

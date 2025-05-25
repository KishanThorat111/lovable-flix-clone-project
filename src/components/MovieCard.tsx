
import React, { useState } from 'react';
import { Play, Plus, Heart, X } from 'lucide-react';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  onAddToList?: (movie: Movie) => void;
  onRemoveFromList?: (movieId: number) => void;
  isInList?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onAddToList, 
  onRemoveFromList, 
  isInList = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInList && onRemoveFromList) {
      onRemoveFromList(movie.id);
    } else if (onAddToList) {
      onAddToList(movie);
    }
  };

  const handlePlayTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <div 
        className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={imageError ? '/api/placeholder/300/450' : movie.image}
            alt={movie.title}
            onError={handleImageError}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Content */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold">
                  ★ {movie.rating}
                </span>
                <span className="text-xs text-gray-300">{movie.year}</span>
              </div>
              <span className="text-xs text-gray-300 capitalize">{movie.type}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePlayTrailer}
                className="flex items-center space-x-1 bg-white text-black px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Play</span>
              </button>
              
              <button 
                onClick={handleAddToList}
                className={`p-2 rounded-full transition-colors ${isInList ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                {isInList ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </button>

              <button className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors">
                <Heart className="h-3 w-3" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {movie.genre.slice(0, 2).map((genre) => (
                <span key={genre} className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[80vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="aspect-video">
              <iframe
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
              <p className="text-gray-300 mb-4">{movie.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>★ {movie.rating}</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="capitalize">{movie.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;

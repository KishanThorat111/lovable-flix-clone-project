
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

  const handleWishlistToggle = (e: React.MouseEvent) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
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
            src={imageError ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop' : movie.image}
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
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${isInList ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                title={isInList ? 'Remove from My List' : 'Add to My List'}
              >
                {isInList ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </button>

              <button 
                className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
                title="Like"
              >
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
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative bg-black rounded-lg overflow-hidden max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors text-xl font-bold"
              title="Close (Press Esc)"
            >
              ✕
            </button>
            
            <div className="aspect-video bg-black">
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
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <span>★ {movie.rating}</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="capitalize">{movie.type}</span>
              </div>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleWishlistToggle}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors ${
                    isInList 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {isInList ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{isInList ? 'Remove from List' : 'Add to My List'}</span>
                </button>
                
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back to Browse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;

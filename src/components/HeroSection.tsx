
import React, { useState, useEffect } from 'react';
import { Play, Plus, Heart, Check } from 'lucide-react';
import { Movie, getFeaturedMovie } from '../data/movies';

interface HeroSectionProps {
  onAddToList?: (movie: Movie) => void;
  onRemoveFromList?: (movieId: number) => void;
  myList?: number[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onAddToList, 
  onRemoveFromList, 
  myList = [] 
}) => {
  const [featuredMovie] = useState<Movie>(getFeaturedMovie());
  const [scrollY, setScrollY] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const isInMyList = myList.includes(featuredMovie.id);

  const handlePlayTrailer = () => {
    setShowTrailer(true);
  };

  const handleMyListToggle = () => {
    if (isInMyList && onRemoveFromList) {
      onRemoveFromList(featuredMovie.id);
    } else if (onAddToList) {
      onAddToList(featuredMovie);
    }
  };

  return (
    <>
      <div className="relative h-screen flex items-center justify-start overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url(${featuredMovie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              {featuredMovie.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in">
              {featuredMovie.description}
            </p>

            <div className="flex items-center space-x-4 mb-8 animate-fade-in">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                ★ {featuredMovie.rating}
              </span>
              <span className="text-gray-300">{featuredMovie.year}</span>
              <span className="text-gray-300">{featuredMovie.duration}</span>
              <div className="flex space-x-2">
                {featuredMovie.genre.slice(0, 3).map((genre) => (
                  <span key={genre} className="text-gray-300 text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 animate-fade-in">
              <button 
                onClick={handlePlayTrailer}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Play</span>
              </button>
              
              <button 
                onClick={handleMyListToggle}
                className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-500 transition-all duration-300 hover:scale-105"
              >
                {isInMyList ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                <span>My List</span>
              </button>

              <button 
                onClick={handleMyListToggle}
                className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
                title={isInMyList ? 'Remove from My List' : 'Add to My List'}
              >
                <Heart className={`h-5 w-5 ${isInMyList ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors text-xl font-bold"
            >
              ✕
            </button>
            
            <div className="aspect-video">
              <iframe
                src={featuredMovie.trailer}
                title={`${featuredMovie.title} Trailer`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{featuredMovie.title}</h2>
              <p className="text-gray-300 mb-4">{featuredMovie.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>★ {featuredMovie.rating}</span>
                <span>{featuredMovie.year}</span>
                <span>{featuredMovie.duration}</span>
                <span className="capitalize">{featuredMovie.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;

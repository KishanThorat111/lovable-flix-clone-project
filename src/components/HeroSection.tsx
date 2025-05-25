
import React, { useState, useEffect } from 'react';
import { Play, Plus, Heart } from 'lucide-react';
import { Movie, getFeaturedMovie } from '../data/movies';

const HeroSection = () => {
  const [featuredMovie] = useState<Movie>(getFeaturedMovie());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
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
            <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105">
              <Play className="h-5 w-5 fill-current" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-500 transition-all duration-300 hover:scale-105">
              <Plus className="h-5 w-5" />
              <span>My List</span>
            </button>

            <button className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

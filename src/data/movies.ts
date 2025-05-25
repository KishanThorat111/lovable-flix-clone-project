
export interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  backdrop: string;
  trailer: string;
  genre: string[];
  year: number;
  rating: number;
  duration: string;
  type: 'movie' | 'series';
  featured?: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
    genre: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    rating: 8.7,
    duration: "51m",
    type: "series",
    featured: true
  },
  {
    id: 2,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    genre: ["Action", "Crime", "Drama"],
    year: 2008,
    rating: 9.0,
    duration: "152m",
    type: "movie"
  },
  {
    id: 3,
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    genre: ["Action", "Sci-Fi", "Thriller"],
    year: 2010,
    rating: 8.8,
    duration: "148m",
    type: "movie"
  },
  {
    id: 4,
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/JWtnJjn6ng0",
    genre: ["Biography", "Drama", "History"],
    year: 2016,
    rating: 8.6,
    duration: "58m",
    type: "series"
  },
  {
    id: 5,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    year: 2014,
    rating: 8.6,
    duration: "169m",
    type: "movie"
  },
  {
    id: 6,
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
    trailer: "https://www.youtube.com/embed/HhesaQXLuRY",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2008,
    rating: 9.5,
    duration: "49m",
    type: "series"
  }
];

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const getMoviesByType = (type: 'movie' | 'series'): Movie[] => {
  return movies.filter(movie => movie.type === type);
};

export const getFeaturedMovie = (): Movie => {
  return movies.find(movie => movie.featured) || movies[0];
};

export const searchMovies = (query: string): Movie[] => {
  const lowercaseQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.description.toLowerCase().includes(lowercaseQuery) ||
    movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
  );
};

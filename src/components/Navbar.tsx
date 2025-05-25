
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-red-600 text-2xl font-bold hover:scale-105 transition-transform">
            NETFLIX
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-gray-300 transition-colors ${isActive('/') ? 'font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`text-white hover:text-gray-300 transition-colors ${isActive('/movies') ? 'font-semibold' : ''}`}
            >
              Movies
            </Link>
            <Link 
              to="/series" 
              className={`text-white hover:text-gray-300 transition-colors ${isActive('/series') ? 'font-semibold' : ''}`}
            >
              TV Shows
            </Link>
            <Link 
              to="/my-list" 
              className={`text-white hover:text-gray-300 transition-colors ${isActive('/my-list') ? 'font-semibold' : ''}`}
            >
              My List
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-black/50 text-white placeholder-gray-400 border border-gray-600 rounded-md px-3 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all w-32 focus:w-48"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
              </button>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=e50914&color=fff`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-md shadow-lg border border-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

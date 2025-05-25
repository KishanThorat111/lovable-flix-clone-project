
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1489599856225-b42e8aa6e89f?w=1920&h=1080&fit=crop)',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-red-600 text-3xl font-bold mb-2">NETFLIX</h1>
            <h2 className="text-white text-2xl font-semibold">Sign In</h2>
          </div>

          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              New to Netflix?{' '}
              <Link to="/signup" className="text-white hover:underline">
                Sign up now
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Demo credentials: Use any email and password to sign in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

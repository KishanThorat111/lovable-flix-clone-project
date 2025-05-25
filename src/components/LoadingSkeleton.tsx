
import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'hero' | 'list';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6, type = 'card' }) => {
  if (type === 'hero') {
    return (
      <div className="h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-transparent" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-2xl">
            <div className="h-16 bg-gray-700 rounded mb-6" />
            <div className="h-6 bg-gray-700 rounded mb-4" />
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-8" />
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-700 rounded" />
              <div className="h-12 w-32 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div key={rowIndex}>
            <div className="h-8 bg-gray-700 rounded w-48 mb-4 mx-4 md:mx-8" />
            <div className="flex space-x-4 px-4 md:px-8">
              {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex-none w-48 md:w-56">
                  <div className="bg-gray-700 rounded-lg h-72 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-gray-700 rounded-lg h-72 animate-pulse" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;

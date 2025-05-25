
import React, { useState } from 'react';
import { User, Mail, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', editedName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ffffff&color=000000&size=128`}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                <p className="text-red-100">Manage your Netflix account</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Account Information */}
            <div className="bg-gray-700/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-red-600" />
                Account Information
              </h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-gray-300 text-sm font-medium">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="block w-full mt-1 bg-gray-600 text-white border border-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    ) : (
                      <p className="text-white text-lg mt-1">{user.name}</p>
                    )}
                  </div>
                  <div className="ml-4 flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-300 text-sm font-medium flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </label>
                  <p className="text-white text-lg mt-1">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-700/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Theme</h3>
                    <p className="text-gray-400 text-sm">Choose your preferred theme</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDark ? 'bg-red-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDark ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-gray-700/30 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Account Actions</h2>
              
              <div className="space-y-4">
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

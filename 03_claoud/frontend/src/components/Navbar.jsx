import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiHome, FiUser, FiSettings } from 'react-icons/fi';
import useAuth from '../hooks/useAuth.js';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span>❄️</span>
            AC Services
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="hover:text-blue-200 transition">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="hover:text-blue-200 transition">
                    Dashboard
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="hover:text-blue-200 transition flex items-center gap-2">
                    <FiUser /> {user?.name}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 first:rounded-t-lg"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 last:rounded-b-lg flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-blue-500">
            <Link
              to="/"
              className="block py-2 hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="block py-2 hover:text-blue-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="block py-2 hover:text-blue-200 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link
                  to="/profile"
                  className="block py-2 hover:text-blue-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-blue-200 transition flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-blue-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 hover:text-blue-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

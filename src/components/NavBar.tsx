import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { LoginDialog } from './auth/LoginDialog';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-purple" />
              <span className="ml-2 text-xl font-bold text-gray-800">LearnSphere</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/study-buddy" className="text-gray-600 hover:text-purple inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple">
                Study Buddy
              </Link>
              <Link to="/quiz-quest" className="text-gray-600 hover:text-purple inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple">
                QuizQuest
              </Link>
              <Link to="/skill-tracker" className="text-gray-600 hover:text-purple inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple">
                Skill Tracker
              </Link>
              <Link to="/exchange-hub" className="text-gray-600 hover:text-purple inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-purple">
                Exchange Hub
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <LoginDialog />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/study-buddy"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-purple"
            >
              Study Buddy
            </Link>
            <Link
              to="/quiz-quest"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-purple"
            >
              QuizQuest
            </Link>
            <Link
              to="/skill-tracker"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-purple"
            >
              Skill Tracker
            </Link>
            <Link
              to="/exchange-hub"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-purple"
            >
              Exchange Hub
            </Link>
            <div className="pl-3 pr-4 py-2">
              <LoginDialog />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

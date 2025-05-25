
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-purple" />
              <span className="ml-2 text-xl font-bold text-gray-800">LearnSphere</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              Your all-in-one AI-powered platform to study smarter, stay motivated, and track your growth. Transform your learning journey today.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/study-buddy" className="text-base text-gray-600 hover:text-purple">
                  Study Buddy
                </Link>
              </li>
              <li>
                <Link to="/quiz-quest" className="text-base text-gray-600 hover:text-purple">
                  QuizQuest
                </Link>
              </li>
              <li>
                <Link to="/skill-tracker" className="text-base text-gray-600 hover:text-purple">
                  Skill Tracker
                </Link>
              </li>
              <li>
                <Link to="/exchange-hub" className="text-base text-gray-600 hover:text-purple">
                  Exchange Hub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-purple">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-purple">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} LearnSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

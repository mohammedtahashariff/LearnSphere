import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GraduationCap } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-light via-white to-soft-blue -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple bg-opacity-10 text-purple-dark mb-6">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI-Powered Learning Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Study Smarter, <br />
                <span className="text-purple">Achieve More</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                LearnSphere combines AI planning, interactive quizzes, and skill tracking to transform how you learn and grow.
              </p>
            </div>
            <div className="relative">
              <div className="animate-float">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-purple-light">
                      <GraduationCap className="h-6 w-6 text-purple" />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold">Study Planner</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                    <div className="h-32 bg-gray-100 rounded-md w-full"></div>
                    <div className="flex space-x-2">
                      <div className="h-10 bg-purple bg-opacity-20 rounded-md w-1/3"></div>
                      <div className="h-10 bg-purple bg-opacity-10 rounded-md w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 transform rotate-3">
                <div className="bg-white rounded-xl shadow-lg p-4 w-40">
                  <div className="h-4 bg-green-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-green-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 transform -rotate-6">
                <div className="bg-white rounded-xl shadow-lg p-4 w-40">
                  <div className="h-4 bg-purple-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-purple-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

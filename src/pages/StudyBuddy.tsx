import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { TestAI } from '@/components/TestAI';

const StudyBuddy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Study Buddy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get personalized study plans and AI-powered assistance to optimize your learning.
            </p>
          </div>
          <TestAI />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudyBuddy;

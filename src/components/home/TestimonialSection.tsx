import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SQL Quiz Implementation</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive quiz system for testing SQL knowledge across different difficulty levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-purple mb-4">Initial Implementation</h3>
                <ul className="text-gray-700 list-disc list-inside mb-4">
                  <li>Added SQL quiz categories (Fundamentals, xyz, Advanced)</li>
                  <li>Created question database with difficulty levels</li>
                  <li>Implemented basic quiz flow with scoring</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-purple mb-4">Fixed Issues</h3>
                <ul className="text-gray-700 list-disc list-inside mb-4">
                  <li>Added "Next Question" button functionality</li>
                  <li>Fixed score tracking and points calculation</li>
                  <li>Added proper question/answer feedback</li>
                  <li>Fixed question progression issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-purple mb-4">Technical Improvements</h3>
                <ul className="text-gray-700 list-disc list-inside mb-4">
                  <li>Implemented question tracking to prevent repetition</li>
                  <li>Fixed type definitions and exports</li>
                  <li>Added proper error handling</li>
                  <li>Enhanced state management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

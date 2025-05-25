
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  timeTaken: string;
  pointsEarned: number;
  onRetry: () => void;
  onHome: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  timeTaken,
  pointsEarned,
  onRetry,
  onHome
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! You're a master of this subject!";
    if (percentage >= 70) return "Great job! You've got a solid understanding.";
    if (percentage >= 50) return "Good effort! Keep practicing to improve.";
    return "Keep studying! You'll get better with practice.";
  };
  
  const getResultColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-4xl font-bold">
            <span>{score}</span>
            <span className="text-gray-400">/{totalQuestions}</span>
          </p>
          <p className={`text-lg font-medium ${getResultColor()}`}>{getResultMessage()}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Score</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Time Taken:</span>
            <span className="font-medium">{timeTaken}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Points Earned:</span>
            <span className="flex items-center font-medium">
              {pointsEarned} <Star className="ml-1 h-4 w-4 text-yellow-400" />
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="w-full"
        >
          Try Again
        </Button>
        <Button 
          onClick={onHome}
          className="w-full bg-purple hover:bg-purple-dark"
        >
          Back to Quizzes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResult;

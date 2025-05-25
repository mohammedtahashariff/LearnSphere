
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Star } from 'lucide-react';

interface QuizCardProps {
  title: string;
  subject: string;
  questionCount: number;
  timeEstimate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  onStart: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  subject,
  questionCount,
  timeEstimate,
  difficulty,
  points,
  onStart
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-2 bg-purple"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{subject}</CardDescription>
          </div>
          <Badge className={getDifficultyColor()}>{difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            <span>{questionCount} Questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{timeEstimate}</span>
          </div>
        </div>
        <div className="flex items-center mt-auto">
          <Star className="text-yellow-400 w-5 h-5 mr-1" />
          <span className="font-medium">{points} Points</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={onStart} 
          className="w-full bg-purple hover:bg-purple-dark"
        >
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;

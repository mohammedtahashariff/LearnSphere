import React, { useState, useEffect, useRef } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuizCard from '@/components/quiz-quest/QuizCard';
import QuizQuestion, { sqlQuestions, QuestionType } from '@/components/quiz-quest/QuizQuestion';
import QuizResult from '@/components/quiz-quest/QuizResult';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  subject: string;
  questionCount: number;
  timeEstimate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

interface Subject {
  name: string;
  portions: {
    topic: string;
    estimatedHours: number;
  }[];
}

interface QuizQuestionProps {
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onAnswer: (isCorrect: boolean, moveToNext?: boolean) => void;
}

const QuizQuest = () => {
  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: 'SQL Fundamentals',
      subject: 'SQL',
      questionCount: 10,
      timeEstimate: '15 mins',
      difficulty: 'Easy',
      points: 50
    },
    {
      id: 2,
      title: 'xyz',
      subject: 'SQL',
      questionCount: 8,
      timeEstimate: '12 mins',
      difficulty: 'Medium',
      points: 80
    },
    {
      id: 3,
      title: 'Advanced SQL',
      subject: 'SQL',
      questionCount: 12,
      timeEstimate: '25 mins',
      difficulty: 'Hard',
      points: 120
    }
  ]);

  const [userPoints, setUserPoints] = useState(() => {
    const savedPoints = localStorage.getItem('userPoints');
    return savedPoints ? parseInt(savedPoints) : 0;
  });
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showResult, setShowResult] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleQuizStart = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUsedQuestions([]);
    setScore(0);
    setAnsweredQuestions(0);
    setStartTime(new Date());
    setShowResult(false);
  };

  const handleAnswer = (isCorrect: boolean, moveToNext: boolean = false) => {
    if (!activeQuiz) return;

    if (isCorrect && !moveToNext) {
      // Only increment score on initial answer, not when moving to next question
      setScore(prev => prev + 1);
    }

    if (moveToNext) {
      setAnsweredQuestions(prev => prev + 1);
      
      // Add current question index to used questions
      const topicQuestions = sqlQuestions[activeQuiz.title]?.[activeQuiz.difficulty];
      if (topicQuestions) {
        const availableQuestions = topicQuestions.filter((_, index) => !usedQuestions.includes(index));
        if (availableQuestions.length > 0) {
          const currentIndex = topicQuestions.indexOf(availableQuestions[0]);
          setUsedQuestions(prev => [...prev, currentIndex]);
        }
      }

      if (currentQuestionIndex + 1 >= activeQuiz.questionCount) {
        // Quiz completed
        const endTime = new Date();
        const timeTaken = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0;
        
        // Calculate points based on score percentage and difficulty multiplier
        const scorePercentage = score / activeQuiz.questionCount;
        const difficultyMultiplier = activeQuiz.difficulty === 'Hard' ? 1.5 : 
                                   activeQuiz.difficulty === 'Medium' ? 1.2 : 1;
        const pointsEarned = Math.round(activeQuiz.points * scorePercentage * difficultyMultiplier);
        
        const newTotalPoints = userPoints + pointsEarned;
        setUserPoints(newTotalPoints);
        localStorage.setItem('userPoints', newTotalPoints.toString());
        
        setShowResult(true);
      } else {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  const handleRetry = () => {
    if (activeQuiz) {
      handleQuizStart(activeQuiz);
    }
  };

  const handleHome = () => {
    setActiveQuiz(null);
    setShowResult(false);
    setUsedQuestions([]);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">QuizQuest</h1>
              <p className="text-gray-600">Test your knowledge, earn points, and climb the leaderboard!</p>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-semibold">{userPoints} Points</span>
            </div>
          </div>

          {!activeQuiz && !showResult && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">SQL</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map(quiz => (
                  <QuizCard
                    key={quiz.id}
                    title={quiz.title}
                    subject={quiz.subject}
                    questionCount={quiz.questionCount}
                    timeEstimate={quiz.timeEstimate}
                    difficulty={quiz.difficulty}
                    points={quiz.points}
                    onStart={() => handleQuizStart(quiz)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeQuiz && !showResult && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{activeQuiz.title}</h2>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    Question {currentQuestionIndex + 1} of {activeQuiz.questionCount}
                  </Badge>
                  <Badge variant="outline">
                    Score: {score}/{answeredQuestions}
                  </Badge>
                </div>
              </div>
              <QuizQuestion
                subject={activeQuiz.subject}
                topic={activeQuiz.title}
                difficulty={activeQuiz.difficulty}
                onAnswer={handleAnswer}
                questionIndex={currentQuestionIndex}
                usedQuestions={usedQuestions}
              />
            </div>
          )}

          {showResult && activeQuiz && startTime && (
            <div className="max-w-3xl mx-auto">
              <QuizResult
                score={score}
                totalQuestions={activeQuiz.questionCount}
                timeTaken={`${Math.floor((new Date().getTime() - startTime.getTime()) / 60000)}m ${Math.floor(((new Date().getTime() - startTime.getTime()) % 60000) / 1000)}s`}
                pointsEarned={Math.round(activeQuiz.points * (score / activeQuiz.questionCount))}
                onRetry={handleRetry}
                onHome={handleHome}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizQuest;

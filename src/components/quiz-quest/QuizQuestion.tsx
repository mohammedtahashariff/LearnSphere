import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface QuestionType {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuestionsByDifficulty {
  Easy?: QuestionType[];
  Medium?: QuestionType[];
  Hard?: QuestionType[];
}

interface QuestionsDatabase {
  [key: string]: QuestionsByDifficulty;
}

export const sqlQuestions: QuestionsDatabase = {
  'SQL Fundamentals': {
    Easy: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Logic",
          "System Query Language"
        ],
        correctAnswer: 0,
        explanation: "SQL stands for Structured Query Language, which is a standard language for managing and manipulating relational databases."
      },
      {
        question: "Which SQL command is used to retrieve data from a database?",
        options: [
          "SELECT",
          "FETCH",
          "GET",
          "RETRIEVE"
        ],
        correctAnswer: 0,
        explanation: "The SELECT statement is used to retrieve or fetch data from a database. It's one of the most fundamental SQL commands."
      },
      {
        question: "Which SQL clause is used to filter records?",
        options: [
          "WHERE",
          "FILTER",
          "HAVING",
          "CONDITION"
        ],
        correctAnswer: 0,
        explanation: "The WHERE clause is used to filter records based on specified conditions in SQL queries."
      },
      {
        question: "What is the purpose of the PRIMARY KEY constraint?",
        options: [
          "To uniquely identify each record in a table",
          "To sort the table data",
          "To join two tables",
          "To index the table"
        ],
        correctAnswer: 0,
        explanation: "A PRIMARY KEY constraint uniquely identifies each record in a database table. It must contain unique values and cannot contain NULL values."
      },
      {
        question: "Which SQL command is used to insert new data into a database?",
        options: [
          "INSERT INTO",
          "ADD",
          "UPDATE",
          "CREATE"
        ],
        correctAnswer: 0,
        explanation: "The INSERT INTO statement is used to add new records to a database table."
      },
      {
        question: "Which SQL command is used to update existing data?",
        options: [
          "UPDATE",
          "MODIFY",
          "CHANGE",
          "ALTER"
        ],
        correctAnswer: 0,
        explanation: "The UPDATE statement is used to modify existing records in a database table."
      },
      {
        question: "Which SQL command is used to delete data from a database?",
        options: [
          "DELETE",
          "REMOVE",
          "DROP",
          "CLEAR"
        ],
        correctAnswer: 0,
        explanation: "The DELETE statement is used to remove records from a database table."
      },
      {
        question: "What is the purpose of the ORDER BY clause?",
        options: [
          "To sort the result set",
          "To filter records",
          "To join tables",
          "To group records"
        ],
        correctAnswer: 0,
        explanation: "The ORDER BY clause is used to sort the result set in ascending or descending order."
      },
      {
        question: "Which SQL operator is used to combine multiple conditions in a WHERE clause?",
        options: [
          "AND",
          "COMBINE",
          "WITH",
          "PLUS"
        ],
        correctAnswer: 0,
        explanation: "The AND operator is used to combine multiple conditions in a WHERE clause. All conditions must be true for the record to be selected."
      },
      {
        question: "What is the purpose of NULL in SQL?",
        options: [
          "To represent a missing or unknown value",
          "To represent zero",
          "To represent an empty string",
          "To represent false"
        ],
        correctAnswer: 0,
        explanation: "NULL represents a missing or unknown value in SQL. It's different from zero or an empty string."
      }
    ],
    Medium: [
      {
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        options: [
          "INNER JOIN returns matching records only, LEFT JOIN returns all records from left table and matching from right",
          "They are the same thing",
          "INNER JOIN is faster than LEFT JOIN",
          "LEFT JOIN can only be used with two tables"
        ],
        correctAnswer: 0,
        explanation: "INNER JOIN returns only the matching records between tables, while LEFT JOIN returns all records from the left table and matching records from the right table."
      },
      {
        question: "What is the purpose of GROUP BY clause?",
        options: [
          "To group rows that have the same values into summary rows",
          "To sort the result set",
          "To filter records",
          "To join tables"
        ],
        correctAnswer: 0,
        explanation: "GROUP BY is used to arrange identical data into groups and is often used with aggregate functions like COUNT, MAX, MIN, SUM, AVG."
      },
      {
        question: "What is the difference between HAVING and WHERE clause?",
        options: [
          "HAVING filters groups, WHERE filters individual rows",
          "They are identical in functionality",
          "HAVING is faster than WHERE",
          "WHERE is used only with JOIN operations"
        ],
        correctAnswer: 0,
        explanation: "WHERE filters rows before grouping, while HAVING filters groups after GROUP BY is applied."
      }
    ],
    Hard: [
      {
        question: "What is a stored procedure in SQL?",
        options: [
          "A precompiled collection of SQL statements stored in the database",
          "A type of database table",
          "A method to store data temporarily",
          "A backup procedure for databases"
        ],
        correctAnswer: 0,
        explanation: "A stored procedure is a prepared SQL code that can be saved and reused. It's a precompiled collection of SQL statements stored in the database."
      },
      {
        question: "What is a trigger in SQL?",
        options: [
          "A special type of stored procedure that automatically runs when an event occurs",
          "A constraint in the database",
          "A type of primary key",
          "A method to optimize queries"
        ],
        correctAnswer: 0,
        explanation: "A trigger is a stored procedure that automatically executes when certain events occur, such as INSERT, UPDATE, or DELETE operations."
      }
    ]
  },
  'xyz': {
    Medium: [
      {
        question: "Which SQL function is used to count the number of rows in a result set?",
        options: [
          "COUNT()",
          "SUM()",
          "TOTAL()",
          "ROWS()"
        ],
        correctAnswer: 0,
        explanation: "The COUNT() function returns the number of rows that matches a specified criterion."
      },
      {
        question: "What is the purpose of the DISTINCT keyword?",
        options: [
          "To return only unique values in a result set",
          "To sort the result set",
          "To join tables",
          "To filter records"
        ],
        correctAnswer: 0,
        explanation: "DISTINCT is used to return only unique (different) values in a result set."
      },
      {
        question: "Which SQL function is used to find the average value?",
        options: [
          "AVG()",
          "MEAN()",
          "AVERAGE()",
          "CALC()"
        ],
        correctAnswer: 0,
        explanation: "The AVG() function returns the average value of a numeric column."
      }
    ]
  },
  'Advanced SQL': {
    Hard: [
      {
        question: "What is a transaction in SQL?",
        options: [
          "A unit of work that is performed against a database",
          "A type of table join",
          "A database backup process",
          "A query optimization technique"
        ],
        correctAnswer: 0,
        explanation: "A transaction is a unit of work that is performed against a database. It follows ACID properties (Atomicity, Consistency, Isolation, Durability)."
      },
      {
        question: "What is the purpose of an SQL index?",
        options: [
          "To speed up data retrieval operations on database tables",
          "To store table data",
          "To create table relationships",
          "To validate data integrity"
        ],
        correctAnswer: 0,
        explanation: "An index is a database structure that speeds up data retrieval operations on database tables at the cost of additional storage and slower writes."
      },
      {
        question: "What is a view in SQL?",
        options: [
          "A virtual table based on the result set of an SQL statement",
          "A physical table in the database",
          "A type of stored procedure",
          "A database backup"
        ],
        correctAnswer: 0,
        explanation: "A view is a virtual table based on the result set of an SQL statement. It contains rows and columns, just like a real table."
      },
      {
        question: "What is the purpose of ACID properties in SQL transactions?",
        options: [
          "To ensure data integrity and reliability in database transactions",
          "To optimize query performance",
          "To manage database backups",
          "To handle user authentication"
        ],
        correctAnswer: 0,
        explanation: "ACID (Atomicity, Consistency, Isolation, Durability) properties ensure that database transactions are processed reliably and maintain data integrity."
      }
    ]
  }
};

interface QuizQuestionProps {
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onAnswer: (isCorrect: boolean, moveToNext?: boolean) => void;
  questionIndex: number;
  usedQuestions: number[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  subject,
  topic,
  difficulty,
  onAnswer,
  questionIndex,
  usedQuestions
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
  const [availableQuestions, setAvailableQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    // Get questions for the current topic and difficulty
    const topicQuestions = sqlQuestions[topic]?.[difficulty] || [];
    
    if (topicQuestions.length > 0) {
      // Filter out used questions
      const remainingQuestions = topicQuestions.filter((_, index) => !usedQuestions.includes(index));
      
      if (remainingQuestions.length > 0) {
        setAvailableQuestions(remainingQuestions);
        // Get a random question from remaining questions
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        setCurrentQuestion(remainingQuestions[randomIndex]);
      } else if (questionIndex === 0) {
        // If starting a new quiz, reset used questions
        const randomIndex = Math.floor(Math.random() * topicQuestions.length);
        setCurrentQuestion(topicQuestions[randomIndex]);
        setAvailableQuestions(topicQuestions);
      } else {
        // All questions have been used
        setCurrentQuestion({
          question: "All questions completed! Would you like to:",
          options: ["Try Again", "Choose Another Quiz", "View Results", "Back to Home"],
          correctAnswer: 0,
          explanation: "You've completed all available questions for this topic and difficulty level."
        });
      }
    }
  }, [topic, difficulty, questionIndex, usedQuestions]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === currentQuestion?.correctAnswer;
    onAnswer(isCorrect);
  };

  const handleNextQuestion = () => {
    if (!currentQuestion) return;
    
    // Add current question to used questions
    const topicQuestions = sqlQuestions[topic]?.[difficulty] || [];
    const currentIndex = topicQuestions.findIndex(q => q.question === currentQuestion.question);
    
    if (currentIndex !== -1) {
      onAnswer(selectedAnswer === currentQuestion.correctAnswer, true);
    }
    
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (!currentQuestion) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === null ? "outline" : 
                index === currentQuestion.correctAnswer ? "secondary" :
                index === selectedAnswer ? "destructive" : "outline"}
              className={`w-full justify-start text-left ${
                selectedAnswer !== null ? 'cursor-default' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? 
                  '✅ Correct!' : 
                  '❌ Incorrect'}
              </p>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
            <Button 
              className="w-full bg-purple hover:bg-purple-dark"
              onClick={handleNextQuestion}
            >
              Next Question
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizQuestion;

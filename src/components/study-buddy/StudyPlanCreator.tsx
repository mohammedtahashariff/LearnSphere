import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileUp, Loader } from "lucide-react";
import { Label } from '@/components/ui/label';

interface StudyTask {
  subject: string;
  topic: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low';
}

const StudyPlanCreator = () => {
  const [syllabus, setSyllabus] = useState('');
  const [examDate, setExamDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<StudyTask[] | null>(null);

  const handleGeneratePlan = () => {
    if (!syllabus.trim()) return;

    setIsLoading(true);
    
    // Simulate AI generating a study plan
    setTimeout(() => {
      const generatedPlan: StudyTask[] = [
        {
          subject: 'गणित (Mathematics)',
          topic: 'Calculus - Derivatives',
          duration: '2 hours',
          priority: 'High'
        },
        {
          subject: 'भौतिकी (Physics)',
          topic: 'Mechanics - Newton\'s Laws',
          duration: '1.5 hours',
          priority: 'Medium'
        },
        {
          subject: 'कंप्यूटर विज्ञान (Computer Science)',
          topic: 'Data Structures - Trees',
          duration: '2 hours',
          priority: 'High'
        },
        {
          subject: 'अंग्रेज़ी (English)',
          topic: 'Literature Analysis',
          duration: '1 hour',
          priority: 'Low'
        },
        {
          subject: 'रसायन विज्ञान (Chemistry)',
          topic: 'Organic Chemistry - Alkanes',
          duration: '1.5 hours',
          priority: 'Medium'
        }
      ];
      
      setPlan(generatedPlan);
      setIsLoading(false);
    }, 2000);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Study Plan Generator</CardTitle>
          <CardDescription>
            Upload your syllabus and exam dates to create a personalized study plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="syllabus">Syllabus Content</Label>
            <Textarea 
              id="syllabus"
              placeholder="Paste your syllabus content here or describe what you need to study..."
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam-date">Exam Date (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="exam-date"
                  type="date"
                  className="pl-10"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Syllabus (Optional)</Label>
              <div className="relative">
                <FileUp className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="file-upload"
                  type="file"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGeneratePlan} 
            className="w-full bg-purple hover:bg-purple-dark"
            disabled={isLoading || !syllabus.trim()}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              'Generate Study Plan'
            )}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
            <CardDescription>
              Here's a suggested study plan based on your syllabus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plan.map((task, index) => (
                <div key={index} className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{task.subject}</h4>
                    <p className="text-gray-600">{task.topic}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{task.duration}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline">
                  Adjust Plan
                </Button>
                <Button className="bg-purple hover:bg-purple-dark">
                  Save Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudyPlanCreator;

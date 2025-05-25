import React, { useState } from 'react';
import { AIService } from '../lib/services/ai';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, Send, User, Calendar, FileUp, Clock, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SubjectPortion {
  topic: string;
  estimatedHours: number;
}

interface Subject {
  name: string;
  portions: SubjectPortion[];
}

interface StudyPlanFormData {
  subjects: Subject[];
  examDate: string;
  dailyHours: number;
}

interface GeneratedPlan {
  examDate: string;
  daysUntilExam: number;
  dailyHours: number;
  totalHours: number;
  hoursPerSubjectPerDay: number;
  subjects: Subject[];
}

export function TestAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your AI Study Buddy. How can I help you with your studies today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Study plan specific states
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [currentPortion, setCurrentPortion] = useState<SubjectPortion>({ topic: '', estimatedHours: 1 });
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(4);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const result = await AIService.generateChatResponse([
        { role: 'user', content: input }
      ]);
      const aiMessage: Message = {
        content: result,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const initializeSubjects = (count: number) => {
    const newSubjects = Array(count).fill(null).map((_, index) => ({
      name: `Subject ${index + 1}`,
      portions: []
    }));
    setSubjects(newSubjects);
    if (newSubjects.length > 0) {
      setSelectedSubject(newSubjects[0].name);
    }
  };

  const updateSubjectName = (index: number, name: string) => {
    // Validate the name
    const trimmedName = name.trim();
    
    // Check if name already exists in other subjects
    const nameExists = subjects.some((subject, i) => i !== index && subject.name.toLowerCase() === trimmedName.toLowerCase());
    
    if (nameExists) {
      setError(`Subject name "${trimmedName}" already exists. Please use a different name.`);
      return;
    }

    const newSubjects = [...subjects];
    newSubjects[index] = {
      ...newSubjects[index],
      name: trimmedName || `Subject ${index + 1}` // Fallback to default name if empty
    };
    setSubjects(newSubjects);
    setError(null); // Clear any previous errors
  };

  const addPortion = () => {
    if (!selectedSubject || !currentPortion.topic || currentPortion.estimatedHours <= 0) return;

    const newSubjects = subjects.map(subject => {
      if (subject.name === selectedSubject) {
        return {
          ...subject,
          portions: [...subject.portions, { ...currentPortion }]
        };
      }
      return subject;
    });

    setSubjects(newSubjects);
    setCurrentPortion({ topic: '', estimatedHours: 1 });
  };

  const removePortion = (subjectName: string, portionIndex: number) => {
    const newSubjects = subjects.map(subject => {
      if (subject.name === subjectName) {
        return {
          ...subject,
          portions: subject.portions.filter((_, index) => index !== portionIndex)
        };
      }
      return subject;
    });
    setSubjects(newSubjects);
  };

  const validateStudyPlan = () => {
    if (!examDate) {
      setError('Please select an exam date');
      return false;
    }

    if (!dailyHours || dailyHours < 1 || dailyHours > 16) {
      setError('Please enter valid daily study hours (between 1 and 16)');
      return false;
    }

    if (subjects.length === 0) {
      setError('Please add at least one subject');
      return false;
    }

    const invalidSubjects = subjects.filter(s => !s.name.trim());
    if (invalidSubjects.length > 0) {
      setError('All subjects must have names');
      return false;
    }

    const subjectsWithNoPortions = subjects.filter(s => s.portions.length === 0);
    if (subjectsWithNoPortions.length > 0) {
      setError(`Please add portions for ${subjectsWithNoPortions.map(s => s.name).join(', ')}`);
      return false;
    }

    return true;
  };

  const handleStudyPlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateStudyPlan()) {
      return;
    }

    setLoading(true);

    try {
      const subjectHours = subjects.map(subject => ({
        name: subject.name,
        totalHours: subject.portions.reduce((sum, portion) => sum + portion.estimatedHours, 0)
      }));
      
      const totalHours = subjectHours.reduce((sum, subject) => sum + subject.totalHours, 0);
      
      const today = new Date();
      const examDay = new Date(examDate);
      const daysUntilExam = Math.ceil((examDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExam <= 0) {
        throw new Error('Exam date must be in the future');
      }

      const totalPossibleHours = daysUntilExam * dailyHours;
      if (totalPossibleHours < totalHours) {
        throw new Error(`With ${dailyHours} hours per day, you won't be able to complete all subjects before the exam. You need at least ${Math.ceil(totalHours / daysUntilExam)} hours per day.`);
      }

      const hoursPerSubjectPerDay = dailyHours / subjects.length;

      // Store the generated plan in state and localStorage
      const generatedPlanData = {
        examDate,
        daysUntilExam,
        dailyHours,
        totalHours,
        hoursPerSubjectPerDay,
        subjects
      };
      
      setGeneratedPlan(generatedPlanData);
      localStorage.setItem('studyPlan', JSON.stringify(generatedPlanData));

      // Reset form
      setSubjects([]);
      setSubjectCount(0);
      setSelectedSubject('');
      setCurrentPortion({ topic: '', estimatedHours: 1 });
      setExamDate('');
      setDailyHours(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="chat">AI Chat Assistant</TabsTrigger>
          <TabsTrigger value="planner">Study Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="max-w-3xl mx-auto">
          <Card className="w-full shadow-md">
            <CardContent className="p-0">
              <div className="bg-purple text-white py-3 px-4 rounded-t-lg">
                <h3 className="font-semibold">AI Study Buddy</h3>
              </div>
              <div className="h-[500px] flex flex-col">
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                        {!message.isUser && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-purple-light text-purple-dark">AI</AvatarFallback>
                          </Avatar>
                        )}
                        {message.isUser && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`rounded-lg px-4 py-2 ${
                            message.isUser 
                              ? 'bg-purple text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-start max-w-[80%]">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-purple-light text-purple-dark">AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                          <div className="flex items-center space-x-2">
                            <Loader className="h-4 w-4 animate-spin" />
                            <p className="text-sm">Thinking...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} className="flex items-center p-4 border-t">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about your studies..."
                    className="flex-grow"
                    disabled={loading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="ml-2 bg-purple hover:bg-purple-dark"
                    disabled={loading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Study Plan Generator</h2>
              <p className="text-gray-600 mb-6">
                Create a balanced study plan across multiple subjects.
              </p>
              
              <form onSubmit={handleStudyPlanSubmit} className="space-y-6">
                {/* Subject Count Section */}
                {subjects.length === 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="subject-count">Number of Subjects</Label>
                    <div className="flex gap-2">
                      <Input
                        id="subject-count"
                        type="number"
                        min="1"
                        max="10"
                        value={subjectCount}
                        onChange={(e) => setSubjectCount(parseInt(e.target.value) || 0)}
                        placeholder="Enter number of subjects"
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        onClick={() => initializeSubjects(subjectCount)}
                        disabled={subjectCount < 1}
                      >
                        Initialize
                      </Button>
                    </div>
                  </div>
                )}

                {/* Subjects Section */}
                {subjects.length > 0 && (
                  <div className="space-y-6">
                    {/* Subject Names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subjects.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Subject {index + 1} Name</Label>
                          <Input
                            value={subject.name}
                            onChange={(e) => updateSubjectName(index, e.target.value)}
                            placeholder={`Subject ${index + 1}`}
                            required
                            className={subject.name.trim() === '' ? 'border-red-500' : ''}
                            onBlur={(e) => {
                              if (e.target.value.trim() === '') {
                                updateSubjectName(index, `Subject ${index + 1}`);
                              }
                            }}
                          />
                          {subject.name.trim() === '' && (
                            <p className="text-sm text-red-500">Subject name cannot be empty</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Subject Portions */}
                    <div className="space-y-4">
                      <Label>Add Portions</Label>
                      <div className="space-y-4">
                        <Select
                          value={selectedSubject}
                          onValueChange={setSelectedSubject}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject, index) => (
                              <SelectItem key={index} value={subject.name}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {selectedSubject && (
                          <>
                            <div className="flex gap-4 items-end">
                              <div className="flex-grow">
                                <Label>Topic/Portion</Label>
                                <Input
                                  value={currentPortion.topic}
                                  onChange={(e) => setCurrentPortion(prev => ({ ...prev, topic: e.target.value }))}
                                  placeholder="Enter topic or portion"
                                />
                              </div>
                              <div className="w-32">
                                <Label>Hours</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={currentPortion.estimatedHours}
                                  onChange={(e) => setCurrentPortion(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 1 }))}
                                />
                              </div>
                              <Button
                                type="button"
                                onClick={addPortion}
                                disabled={!currentPortion.topic || currentPortion.estimatedHours < 1}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {subjects.find(s => s.name === selectedSubject)?.portions.map((portion, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                  <span>{portion.topic} ({portion.estimatedHours} hours)</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removePortion(selectedSubject, index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Exam Date and Daily Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="exam-date">Exam Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="exam-date"
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            className="pl-10"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="daily-hours">Daily Study Hours</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="daily-hours"
                            type="number"
                            value={dailyHours}
                            onChange={(e) => setDailyHours(parseInt(e.target.value) || 4)}
                            min="1"
                            max="16"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple hover:bg-purple-dark"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Generating Plan...
                        </>
                      ) : (
                        'Generate Study Plan'
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Generated Study Plan Card */}
          {generatedPlan && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">📚 Study Plan Summary</h2>
                
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-purple/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Exam Date</p>
                      <p className="font-semibold">{new Date(generatedPlan.examDate).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-purple/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Days Until Exam</p>
                      <p className="font-semibold">{generatedPlan.daysUntilExam} days</p>
                    </div>
                    <div className="bg-purple/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Daily Study</p>
                      <p className="font-semibold">{generatedPlan.dailyHours} hours</p>
                    </div>
                    <div className="bg-purple/10 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="font-semibold">{generatedPlan.totalHours} hours</p>
                    </div>
                  </div>

                  {/* Subject Breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">📋 Subject Breakdown</h3>
                    {generatedPlan.subjects.map((subject, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{subject.name}</h4>
                          <span className="text-purple bg-purple/10 px-3 py-1 rounded-full text-sm">
                            {(generatedPlan.hoursPerSubjectPerDay * 60).toFixed(0)} mins daily
                          </span>
                        </div>
                        <div className="space-y-2">
                          {subject.portions.map((portion, pIndex) => (
                            <div key={pIndex} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                              <span>{portion.topic}</span>
                              <span className="text-gray-600">{portion.estimatedHours} hours total</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tips and Notes */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">💡 Study Tips</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Rotate through subjects daily to maintain balanced progress</li>
                        <li>Break each subject's time slot into focused study sessions</li>
                        <li>Take short breaks between subjects</li>
                        <li>Review previous topics before starting new ones</li>
                        <li>Track your progress for each portion</li>
                        <li>Adjust time allocation based on your comfort level with each subject</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">⚠️ Important Notes</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Each subject gets {(generatedPlan.hoursPerSubjectPerDay * 60).toFixed(0)} minutes daily</li>
                        <li>Total daily study time: {generatedPlan.dailyHours} hours</li>
                        <li>Use a timer to stick to the schedule</li>
                        <li>Be flexible and adjust the plan if needed</li>
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setGeneratedPlan(null)}
                    >
                      Create New Plan
                    </Button>
                    <Button
                      className="bg-purple hover:bg-purple-dark"
                      onClick={() => window.print()}
                    >
                      Print Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, Send, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your AI Study Buddy. How can I help you with your studies today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsLoading(true);

    // Simulate AI response with more relevant answers
    setTimeout(() => {
      let response = generateRelevantResponse(input);

      const aiMessage: Message = {
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateRelevantResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Education/academic related queries
    if (lowerQuery.includes('math') || lowerQuery.includes('mathematics')) {
      return "I'd be happy to help with mathematics! Could you specify which math concept you're struggling with? I can explain algebra, calculus, geometry, statistics, or other math topics and provide practice problems with step-by-step solutions.";
    } 
    
    if (lowerQuery.includes('algebra')) {
      return "Algebra involves using symbols to represent numbers in formulas and equations. What specific algebraic concept are you working on? Linear equations, quadratics, functions, or something else? I can provide examples and step-by-step solutions.";
    }
    
    if (lowerQuery.includes('calculus')) {
      return "Calculus explores rates of change and accumulation through derivatives and integrals. Are you working on limits, differentiation, integration, or applications? I can explain concepts and walk through example problems.";
    }
    
    if (lowerQuery.includes('science') || lowerQuery.includes('biology')) {
      return "I can definitely help with biology! Are you studying cell structure, genetics, evolution, ecology, or human physiology? Let me know the specific topic, and I can provide explanations, diagrams, or help you prepare for exams.";
    } 
    
    if (lowerQuery.includes('chemistry')) {
      return "Chemistry can be challenging! Would you like help with atomic structure, chemical bonding, stoichiometry, thermodynamics, or organic chemistry? I can explain concepts, balance equations, or help with problem-solving approaches.";
    }
    
    if (lowerQuery.includes('physics')) {
      return "Physics concepts often require both mathematical understanding and conceptual clarity. Are you studying mechanics, electricity, magnetism, thermodynamics, or modern physics? I can help explain laws, formulas, and problem-solving techniques.";
    }
    
    if (lowerQuery.includes('english') || lowerQuery.includes('literature')) {
      return "For English and literature, I can help with essay writing, literary analysis, grammar, or understanding specific works. What are you currently reading or working on?";
    }
    
    // Study techniques
    if (lowerQuery.includes('study plan') || lowerQuery.includes('schedule')) {
      return "Creating an effective study plan involves understanding your learning style, priorities, and available time. I recommend dividing subjects into manageable chunks, scheduling regular review sessions, and incorporating active recall techniques. Would you like me to help create a personalized study schedule for you based on your subjects and available time?";
    }
    
    if (lowerQuery.includes('focus') || lowerQuery.includes('concentrate')) {
      return "Improving focus during study sessions is crucial. Try the Pomodoro technique (25 minutes of focused study followed by a 5-minute break), eliminate distractions like phones, create a dedicated study environment, and consider background sounds like white noise or instrumental music. Would you like more specific techniques based on your situation?";
    }
    
    if (lowerQuery.includes('remember') || lowerQuery.includes('memorize')) {
      return "For better memorization, try active recall (testing yourself rather than re-reading), spaced repetition (reviewing material at increasing intervals), creating memory palaces, teaching concepts to others, and connecting new information to things you already know. Which subject are you trying to memorize for?";
    }
    
    if (lowerQuery.includes('exam') || lowerQuery.includes('test')) {
      return "For exam preparation, start early with spaced practice, use past papers to familiarize yourself with the format, create concise summary notes, practice active recall, and ensure proper sleep and nutrition before the test. What specific exam are you preparing for?";
    }
    
    if (lowerQuery.includes('note') || lowerQuery.includes('notes')) {
      return "Effective note-taking strategies include the Cornell method (dividing pages into sections for notes, cues, and summaries), mind mapping (visual organization of concepts), the outline method (hierarchical structure), or digital systems like Notion or Evernote. Would you like me to explain any of these methods in more detail?";
    }
    
    // General response for other queries
    return "That's an interesting question about " + query.split(' ').slice(0, 3).join(' ') + "... Could you provide more details about what specific help you need with this topic? I can offer explanations, study strategies, practice problems, or help you create a study plan.";
  };

  return (
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
                      <AvatarFallback className="bg-gray-200 text-gray-600"><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      message.isUser 
                        ? 'bg-purple text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
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

          <form onSubmit={handleSubmit} className="flex items-center p-4 border-t">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your studies..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="ml-2 bg-purple hover:bg-purple-dark"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;


import React from 'react';
import { Calendar, FileText, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'AI Study Buddy',
    description: 'Upload your syllabus for personalized study plans and get real-time help with your doubts from our AI assistant.',
    color: 'bg-soft-blue'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'QuizQuest',
    description: 'Engage with interactive quizzes by subject, earn points and badges, and climb the leaderboard.',
    color: 'bg-soft-yellow'
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Skill Tracker',
    description: 'Log your activities, visualize growth across academic and soft skills with detailed charts and timelines.',
    color: 'bg-soft-green'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Exchange Hub',
    description: 'Connect with peers to offer and request learning sessions, building skills beyond academics.',
    color: 'bg-soft-pink'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Excel</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform equips you with powerful tools to transform your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-none">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-purple-dark mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

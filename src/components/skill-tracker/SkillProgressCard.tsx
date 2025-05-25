
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SkillProgressCardProps {
  skill: string;
  category: string;
  progress: number;
  lastActivity?: string;
  milestoneReached?: string;
}

const SkillProgressCard: React.FC<SkillProgressCardProps> = ({
  skill,
  category,
  progress,
  lastActivity,
  milestoneReached
}) => {
  const getProgressColor = () => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{skill}</CardTitle>
            <Badge variant="secondary" className="mt-1">{category}</Badge>
          </div>
          <div className="text-2xl font-bold">{progress}%</div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress value={progress} className={`h-2 ${getProgressColor()}`} />
        {lastActivity && (
          <p className="text-sm text-gray-500 mt-2">
            Last activity: {lastActivity}
          </p>
        )}
      </CardContent>
      {milestoneReached && (
        <CardFooter className="pt-0">
          <div className="w-full text-sm bg-purple bg-opacity-10 text-purple-dark p-2 rounded">
            <span className="font-medium">Milestone reached:</span> {milestoneReached}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SkillProgressCard;

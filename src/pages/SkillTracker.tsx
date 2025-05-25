import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SkillRadarChart from '@/components/skill-tracker/SkillRadarChart';
import SkillProgressCard from '@/components/skill-tracker/SkillProgressCard';
import ActivityLogForm from '@/components/skill-tracker/ActivityLogForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ChartBar, List, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock skill data
const skillRadarData = [
  { name: 'Academic', value: 70, fullMark: 100 },
  { name: 'Technical', value: 85, fullMark: 100 },
  { name: 'Soft Skills', value: 60, fullMark: 100 },
  { name: 'Language', value: 45, fullMark: 100 },
  { name: 'Creative', value: 55, fullMark: 100 },
];

const initialSkillProgressData = [
  { 
    skill: 'Math Problem Solving', 
    category: 'Academic', 
    progress: 75,
    lastActivity: 'Yesterday',
    milestoneReached: 'Completed 50 practice problems'
  },
  { 
    skill: 'Python Programming', 
    category: 'Technical', 
    progress: 85,
    lastActivity: '2 days ago'
  },
  { 
    skill: 'Public Speaking', 
    category: 'Soft Skills', 
    progress: 60,
    lastActivity: 'Last week',
    milestoneReached: 'Gave first presentation'
  },
  { 
    skill: 'Spanish Language', 
    category: 'Language', 
    progress: 45,
    lastActivity: '3 days ago'
  },
];

// Updated to include all days of the week in correct order
const initialActivityData = [
  { name: 'Mon', activities: 3 },
  { name: 'Tue', activities: 5 },
  { name: 'Wed', activities: 2 },
  { name: 'Thu', activities: 7 },
  { name: 'Fri', activities: 4 },
  { name: 'Sat', activities: 3 },
  { name: 'Sun', activities: 1 }
];

const growthData = [
  { month: 'Jan', academic: 30, technical: 40, softSkills: 20 },
  { month: 'Feb', academic: 35, technical: 45, softSkills: 25 },
  { month: 'Mar', academic: 40, technical: 50, softSkills: 35 },
  { month: 'Apr', academic: 50, technical: 55, softSkills: 40 },
  { month: 'May', academic: 55, technical: 65, softSkills: 45 },
  { month: 'Jun', academic: 70, technical: 70, softSkills: 50 },
];

interface Activity {
  name: string;
  category: string;
  duration: string;
  date: string;
  notes?: string;
}

interface SkillData {
  skill: string;
  category: string;
  progress: number;
  lastActivity: string;
  milestoneReached?: string;
}

const SkillTracker = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityData, setActivityData] = useState(initialActivityData);
  const [skillProgressData, setSkillProgressData] = useState<SkillData[]>(initialSkillProgressData);
  
  // State for Add New Skill dialog
  const [isNewSkillDialogOpen, setIsNewSkillDialogOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');

  const handleLogActivity = (activity: Activity) => {
    setActivities([activity, ...activities]);
    
    // Update weekly activity data
    const dayMap: {[key: string]: string} = {
      "0": "Sun", "1": "Mon", "2": "Tue", "3": "Wed", "4": "Thu", "5": "Fri", "6": "Sat"
    };
    
    // Get the day of the week for the activity
    const activityDate = new Date(activity.date);
    const dayIndex = activityDate.getDay();
    const dayName = dayMap[dayIndex.toString()];
    
    // Update the activity count for that day
    const updatedActivityData = [...activityData];
    const dayToUpdate = updatedActivityData.find(day => day.name === dayName);
    if (dayToUpdate) {
      dayToUpdate.activities += 1;
    }
    
    setActivityData(updatedActivityData);
    
    // Update skill progress if matching skill exists
    const updatedSkillData = [...skillProgressData];
    const skillToUpdate = updatedSkillData.find(skill => 
      skill.category === activity.category || skill.skill.toLowerCase().includes(activity.name.toLowerCase())
    );
    
    if (skillToUpdate) {
      skillToUpdate.progress = Math.min(100, skillToUpdate.progress + 5);
      skillToUpdate.lastActivity = 'Today';
    }
    
    setSkillProgressData(updatedSkillData);
  };
  
  const handleAddSkill = () => {
    if (!newSkillName || !newSkillCategory) return;
    
    const newSkill: SkillData = {
      skill: newSkillName,
      category: newSkillCategory,
      progress: 10, // Starting progress
      lastActivity: 'Just added'
    };
    
    setSkillProgressData([...skillProgressData, newSkill]);
    
    // Reset form and close dialog
    setNewSkillName('');
    setNewSkillCategory('');
    setIsNewSkillDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Skill Tracker</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitor your growth across different skills and set goals to keep improving.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-2">
              <SkillRadarChart data={skillRadarData} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="activities" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Growth Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="academic" stroke="#9b87f5" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="technical" stroke="#7E69AB" />
                      <Line type="monotone" dataKey="softSkills" stroke="#FEC6A1" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="skills">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="skills"><List className="mr-2 h-4 w-4" /> Skills</TabsTrigger>
              <TabsTrigger value="activities"><Calendar className="mr-2 h-4 w-4" /> Activities</TabsTrigger>
              <TabsTrigger value="log"><ChartBar className="mr-2 h-4 w-4" /> Log Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillProgressData.map((skill, index) => (
                  <SkillProgressCard
                    key={index}
                    skill={skill.skill}
                    category={skill.category}
                    progress={skill.progress}
                    lastActivity={skill.lastActivity}
                    milestoneReached={skill.milestoneReached}
                  />
                ))}
                <Card className="flex items-center justify-center h-40 border-dashed cursor-pointer hover:bg-gray-50" 
                      onClick={() => setIsNewSkillDialogOpen(true)}>
                  <Button variant="ghost" className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Add New Skill
                  </Button>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activities">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Recent Activities</h3>
                  <Badge className="bg-purple">{activities.length + 12} Total</Badge>
                </div>
                
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{activity.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{activity.category}</Badge>
                            <span className="text-sm text-gray-500">{activity.duration}</span>
                          </div>
                          {activity.notes && (
                            <p className="text-sm text-gray-600 mt-2">{activity.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Preload with some activities if user hasn't added any yet */}
                  {activities.length === 0 && (
                    <>
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Completed Algebra Quiz</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">Academic</Badge>
                              <span className="text-sm text-gray-500">30min</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Today</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Project Team Meeting</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">Soft Skills</Badge>
                              <span className="text-sm text-gray-500">1hr</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Led discussion on project timeline</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Yesterday</span>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="log">
              <ActivityLogForm onLogActivity={handleLogActivity} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Add New Skill Dialog */}
      <Dialog open={isNewSkillDialogOpen} onOpenChange={setIsNewSkillDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skill-name" className="text-right">
                Skill Name
              </Label>
              <Input
                id="skill-name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Creative Writing"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skill-category" className="text-right">
                Category
              </Label>
              <Select value={newSkillCategory} onValueChange={setNewSkillCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSkillDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple hover:bg-purple-dark" onClick={handleAddSkill} disabled={!newSkillName || !newSkillCategory}>
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default SkillTracker;

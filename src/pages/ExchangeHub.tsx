import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Star, Calendar, User, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

// Mock skill exchange listings
const initialOfferListings = [
  {
    id: 1,
    title: 'Python Programming Basics',
    description: 'I can help with Python fundamentals, data structures, and simple algorithms.',
    user: {
      name: 'Kanasu M.',
      rating: 4.8,
      sessions: 12,
      avatar: '/placeholder.svg',
      initials: 'KM'
    },
    tags: ['Programming', 'Computer Science']
  },
  {
    id: 2,
    title: 'Spanish Conversation Practice',
    description: 'Native Spanish speaker offering conversation practice for all levels.',
    user: {
      name: 'Naushin S.',
      rating: 4.9,
      sessions: 24,
      avatar: '/placeholder.svg',
      initials: 'NS'
    },
    tags: ['Language', 'Spanish']
  },
  {
    id: 3,
    title: 'Calculus Tutoring',
    description: 'Help with derivatives, integrals, and calculus problem-solving techniques.',
    user: {
      name: 'Nafisa K.',
      rating: 4.7,
      sessions: 8,
      avatar: '/placeholder.svg',
      initials: 'NK'
    },
    tags: ['Mathematics', 'Calculus']
  },
  {
    id: 4,
    title: 'Public Speaking Tips',
    description: 'Learn how to deliver confident presentations and improve speaking skills.',
    user: {
      name: 'Sanjana R.',
      rating: 5.0,
      sessions: 15,
      avatar: '/placeholder.svg',
      initials: 'SR'
    },
    tags: ['Soft Skills', 'Communication']
  }
];

const initialRequestListings = [
  {
    id: 1,
    title: 'Need Help with Physics Mechanics',
    description: 'Looking for someone to explain Newton\'s laws and mechanics problems.',
    user: {
      name: 'Priya M.',
      avatar: '/placeholder.svg',
      initials: 'PM'
    },
    tags: ['Physics', 'Science']
  },
  {
    id: 2,
    title: 'Guitar Basics for Beginner',
    description: 'Would like to learn basic chords and simple songs. Complete beginner here!',
    user: {
      name: 'Kavya S.',
      avatar: '/placeholder.svg',
      initials: 'KS'
    },
    tags: ['Music', 'Guitar']
  },
  {
    id: 3,
    title: 'Help with Essay Writing',
    description: 'Need feedback on essay structure and academic writing techniques.',
    user: {
      name: 'Tanvi D.',
      avatar: '/placeholder.svg',
      initials: 'TD'
    },
    tags: ['English', 'Writing']
  }
];

interface SessionRequest {
  listingId: number;
  message: string;
  proposedTime: string;
}

const ExchangeHub = () => {
  const [offerListings, setOfferListings] = useState(initialOfferListings);
  const [requestListings, setRequestListings] = useState(initialRequestListings);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for session request dialog
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [currentListing, setCurrentListing] = useState<number | null>(null);
  const [sessionMessage, setSessionMessage] = useState('');
  const [proposedTime, setProposedTime] = useState('');
  
  // State for offer help dialog
  const [isOfferHelpDialogOpen, setIsOfferHelpDialogOpen] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  
  // State for new offer dialog
  const [isNewOfferDialogOpen, setIsNewOfferDialogOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [offerTags, setOfferTags] = useState('');
  
  // State for new request dialog
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestTags, setRequestTags] = useState('');

  const handleRequestSession = (listingId: number) => {
    setCurrentListing(listingId);
    setIsSessionDialogOpen(true);
  };
  
  const submitSessionRequest = () => {
    if (!sessionMessage || !proposedTime) return;
    
    // In a real app, this would send the request to the server
    const selectedListing = offerListings.find(listing => listing.id === currentListing);
    
    toast({
      title: "Session Requested!",
      description: `Your request has been sent to ${selectedListing?.user.name}. You'll receive a notification when they respond.`,
    });
    
    // Reset form and close dialog
    setSessionMessage('');
    setProposedTime('');
    setIsSessionDialogOpen(false);
  };
  
  const handleOfferHelp = (listingId: number) => {
    setCurrentListing(listingId);
    setIsOfferHelpDialogOpen(true);
  };
  
  const submitHelpOffer = () => {
    if (!helpMessage || !proposedDate) return;
    
    // In a real app, this would send the offer to the server
    const selectedRequest = requestListings.find(request => request.id === currentListing);
    
    toast({
      title: "Help Offered!",
      description: `Your offer has been sent to ${selectedRequest?.user.name}. You'll receive a notification when they respond.`,
    });
    
    // Reset form and close dialog
    setHelpMessage('');
    setProposedDate('');
    setIsOfferHelpDialogOpen(false);
  };
  
  const handleCreateOffer = () => {
    if (!offerTitle || !offerDescription) return;
    
    const newOffer = {
      id: offerListings.length + 1,
      title: offerTitle,
      description: offerDescription,
      user: {
        name: 'You',
        rating: 5.0,
        sessions: 0,
        avatar: '/placeholder.svg',
        initials: 'YU'
      },
      tags: offerTags.split(',').map(tag => tag.trim())
    };
    
    setOfferListings([...offerListings, newOffer]);
    
    toast({
      title: "Skill Offer Created!",
      description: "Your skill offer has been published and is now visible to others.",
    });
    
    // Reset form and close dialog
    setOfferTitle('');
    setOfferDescription('');
    setOfferTags('');
    setIsNewOfferDialogOpen(false);
  };
  
  const handleCreateRequest = () => {
    if (!requestTitle || !requestDescription) return;
    
    const newRequest = {
      id: requestListings.length + 1,
      title: requestTitle,
      description: requestDescription,
      user: {
        name: 'You',
        avatar: '/placeholder.svg',
        initials: 'YU'
      },
      tags: requestTags.split(',').map(tag => tag.trim())
    };
    
    setRequestListings([...requestListings, newRequest]);
    
    toast({
      title: "Help Request Created!",
      description: "Your help request has been published and is now visible to others.",
    });
    
    // Reset form and close dialog
    setRequestTitle('');
    setRequestDescription('');
    setRequestTags('');
    setIsNewRequestDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Skill Exchange Hub</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with peers to share knowledge and learn new skills through collaborative exchange.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search for skills or subjects..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button 
                className="bg-purple hover:bg-purple-dark"
                onClick={() => setIsNewOfferDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Offer Skill
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsNewRequestDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Request Help
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="offers">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="offers">Skills Offered</TabsTrigger>
              <TabsTrigger value="requests">Help Requested</TabsTrigger>
            </TabsList>
            
            <TabsContent value="offers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerListings
                  .filter(listing => 
                    searchQuery === '' || 
                    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map(listing => (
                  <Card key={listing.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle>{listing.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {listing.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {listing.description}
                      </CardDescription>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={listing.user.avatar} alt={listing.user.name} />
                          <AvatarFallback>{listing.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{listing.user.name}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-gray-500 ml-1">{listing.user.rating} ({listing.user.sessions} sessions)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-purple hover:bg-purple-dark"
                        onClick={() => handleRequestSession(listing.id)}
                      >
                        Request Session
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requests">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requestListings
                  .filter(listing => 
                    searchQuery === '' || 
                    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map(listing => (
                  <Card key={listing.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle>{listing.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {listing.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {listing.description}
                      </CardDescription>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={listing.user.avatar} alt={listing.user.name} />
                          <AvatarFallback>{listing.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{listing.user.name}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-purple hover:bg-purple-dark"
                        onClick={() => handleOfferHelp(listing.id)}
                      >
                        Offer Help
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card 
                  className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:bg-gray-50"
                  onClick={() => setIsNewRequestDialogOpen(true)}
                >
                  <div className="rounded-full bg-purple bg-opacity-10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-purple" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Request Help</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Need help with a specific subject? Add your request here.
                  </p>
                  <Button variant="outline">Post a Request</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 bg-purple-light bg-opacity-30 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Upcoming Sessions</h2>
              <p className="text-gray-600">Your scheduled learning exchanges.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>Python Data Structures</CardTitle>
                    <Badge>Tomorrow</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">May 7, 2025 • 3:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Alex J.</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Focus on dictionaries, sets, and common operations.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button size="sm" className="bg-purple hover:bg-purple-dark">Join</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-dashed flex flex-col items-center justify-center p-6">
                <p className="text-gray-500 mb-4">No other upcoming sessions</p>
                <Button variant="outline" className="bg-purple bg-opacity-10 text-purple border-purple">
                  Find More Sessions
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Request Session Dialog */}
      <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Learning Session</DialogTitle>
            <DialogDescription>
              {offerListings.find(l => l.id === currentListing)?.user.name} will be notified of your request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="session-message">Message</Label>
              <Textarea
                id="session-message"
                placeholder="Explain what you'd like to learn and any specific topics..."
                value={sessionMessage}
                onChange={(e) => setSessionMessage(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="proposed-time">Proposed Time</Label>
              <Select value={proposedTime} onValueChange={setProposedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomorrow-morning">Tomorrow morning</SelectItem>
                  <SelectItem value="tomorrow-afternoon">Tomorrow afternoon</SelectItem>
                  <SelectItem value="tomorrow-evening">Tomorrow evening</SelectItem>
                  <SelectItem value="this-weekend">This weekend</SelectItem>
                  <SelectItem value="next-week">Next week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSessionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple hover:bg-purple-dark" 
              onClick={submitSessionRequest}
              disabled={!sessionMessage || !proposedTime}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Offer Help Dialog */}
      <Dialog open={isOfferHelpDialogOpen} onOpenChange={setIsOfferHelpDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Offer Help</DialogTitle>
            <DialogDescription>
              {requestListings.find(l => l.id === currentListing)?.user.name} will be notified of your offer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="help-message">Message</Label>
              <Textarea
                id="help-message"
                placeholder="Explain how you can help and your qualifications..."
                value={helpMessage}
                onChange={(e) => setHelpMessage(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="proposed-date">Available Dates</Label>
              <Select value={proposedDate} onValueChange={setProposedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This week</SelectItem>
                  <SelectItem value="weekend">This weekend</SelectItem>
                  <SelectItem value="next-week">Next week</SelectItem>
                  <SelectItem value="flexible">Flexible (will coordinate)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOfferHelpDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple hover:bg-purple-dark"
              onClick={submitHelpOffer}
              disabled={!helpMessage || !proposedDate}
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Submit Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Skill Offer Dialog */}
      <Dialog open={isNewOfferDialogOpen} onOpenChange={setIsNewOfferDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Offer Your Skill</DialogTitle>
            <DialogDescription>
              Share your expertise with others looking to learn.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="offer-title">Title</Label>
              <Input
                id="offer-title"
                placeholder="e.g., JavaScript Fundamentals, Essay Writing Help"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="offer-description">Description</Label>
              <Textarea
                id="offer-description"
                placeholder="Describe what you can teach, your experience level, and approach..."
                className="min-h-[100px]"
                value={offerDescription}
                onChange={(e) => setOfferDescription(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="offer-tags">Tags (comma-separated)</Label>
              <Input
                id="offer-tags"
                placeholder="e.g., Programming, JavaScript, Web Development"
                value={offerTags}
                onChange={(e) => setOfferTags(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewOfferDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple hover:bg-purple-dark"
              onClick={handleCreateOffer}
              disabled={!offerTitle || !offerDescription}
            >
              Create Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Help Request Dialog */}
      <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Request Help</DialogTitle>
            <DialogDescription>
              Describe what you'd like to learn and find someone to help you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="request-title">Title</Label>
              <Input
                id="request-title"
                placeholder="e.g., Need Help with Physics Mechanics"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="request-description">Description</Label>
              <Textarea
                id="request-description"
                placeholder="Describe what you want to learn and your current level..."
                className="min-h-[100px]"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="request-tags">Tags (comma-separated)</Label>
              <Input
                id="request-tags"
                placeholder="e.g., Physics, Science, Mechanics"
                value={requestTags}
                onChange={(e) => setRequestTags(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple hover:bg-purple-dark"
              onClick={handleCreateRequest}
              disabled={!requestTitle || !requestDescription}
            >
              Post Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ExchangeHub;

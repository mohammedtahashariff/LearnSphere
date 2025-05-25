import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyBuddy from "./pages/StudyBuddy";
import QuizQuest from "./pages/QuizQuest";
import SkillTracker from "./pages/SkillTracker";
import ExchangeHub from "./pages/ExchangeHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-buddy" element={<StudyBuddy />} />
          <Route path="/quiz-quest" element={<QuizQuest />} />
          <Route path="/skill-tracker" element={<SkillTracker />} />
          <Route path="/exchange-hub" element={<ExchangeHub />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

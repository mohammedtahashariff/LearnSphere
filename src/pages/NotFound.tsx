
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-light via-white to-soft-blue px-4">
      <GraduationCap className="h-20 w-20 text-purple mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        Oops! It seems this learning pathway doesn't exist.
      </p>
      <Button asChild className="bg-purple hover:bg-purple-dark">
        <Link to="/">Return to LearnSphere</Link>
      </Button>
    </div>
  );
};

export default NotFound;

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { undergraduateCourses } from "@/lib/models/User";
import axios from 'axios';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(16, "Must be at least 16 years old").max(100, "Must be under 100 years old"),
  education: z.enum(undergraduateCourses)
});

type FormData = z.infer<typeof formSchema>;

const API_URL = 'http://localhost:5000';

export function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  // Test server connection
  const testServerConnection = async () => {
    try {
      const response = await axios.get(`${API_URL}/test`);
      console.log('Server test successful:', response.data);
      return true;
    } catch (error) {
      console.error('Server test failed:', error);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      // First test the server connection
      const isServerConnected = await testServerConnection();
      if (!isServerConnected) {
        throw new Error('Cannot connect to server. Please make sure the server is running.');
      }

      // Proceed with login
      const response = await axios.post(`${API_URL}/api/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login successful:', response.data);
      toast.success('Login successful!');
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Cannot connect to server. Please make sure the server is running.';
        } else if (error.response) {
          errorMessage = error.response.data?.message || error.message;
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your connection.';
        }
      }
      
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple hover:bg-purple-dark text-white">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {serverError}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Select onValueChange={(value) => setValue("education", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                {undergraduateCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.education && (
              <p className="text-sm text-red-500">{errors.education.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
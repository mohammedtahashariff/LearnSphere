import mongoose from 'mongoose';

const undergraduateCourses = [
  'Computer Science',
  'Engineering',
  'Business Administration',
  'Medicine',
  'Law',
  'Architecture',
  'Psychology',
  'Economics',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'History',
  'Philosophy'
] as const;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 100
  },
  education: {
    type: String,
    required: true,
    enum: undergraduateCourses
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);
export type UndergraduateCourse = typeof undergraduateCourses[number];
export { undergraduateCourses }; 
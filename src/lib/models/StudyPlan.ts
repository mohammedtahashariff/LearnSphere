import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: {
    type: Number, // in minutes
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  scheduledFor: Date,
});

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  subject: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema); 
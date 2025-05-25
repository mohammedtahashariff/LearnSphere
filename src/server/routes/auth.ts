import express from 'express';
import { User, UndergraduateCourse, undergraduateCourses } from '../../lib/models/User';

const router = express.Router();

// Validation middleware
const validateLoginInput = (req: any, res: any, next: any) => {
  const { name, age, education } = req.body;

  if (!name || typeof name !== 'string' || name.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    });
  }

  if (!age || typeof age !== 'number' || age < 16 || age > 100) {
    return res.status(400).json({
      success: false,
      message: 'Age must be between 16 and 100'
    });
  }

  if (!education || !undergraduateCourses.includes(education)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid education selection'
    });
  }

  next();
};

router.post('/login', validateLoginInput, async (req, res) => {
  try {
    const { name, age, education } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user: {
          id: existingUser._id,
          name: existingUser.name,
          age: existingUser.age,
          education: existingUser.education
        }
      });
    }

    // Create a new user if doesn't exist
    const user = new User({
      name,
      age,
      education
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        age: user.age,
        education: user.education
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing login request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 
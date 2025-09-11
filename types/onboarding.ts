export interface OnboardingData {
  email: string;
  password: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  fitness_level: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: string[];
}

export interface FitnessGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FitnessLevel {
  id: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  description: string;
}

export interface OnboardingStep {
  id: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}
// 🎯 TIPOS DO ONBOARDING GAMIFICADO

export type Mission = {
  id: string;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
};

export type UserProfile = {
  goal: string;
  hasIdea: boolean;
  motivation: string;
  dailyMinutes: number;
  name?: string;
  avatar?: string;
};

export type Mistake = {
  questionId: string;
  userAnswer: number;
  correctAnswer: number;
  question: string;
};

export type SubscriptionPlan = 'FREE' | 'PREMIUM';

export type OnboardingProgress = {
  currentStep: number;
  completedMission: boolean;
  profileCreated: boolean;
  goalSet: boolean;
  planSelected: boolean;
  score: number;
  mistakes: Mistake[];
  streak: number;
};

export type UserSubscription = {
  plan: SubscriptionPlan;
  isTrialActive: boolean;
  trialStartDate?: string;
  trialEndDate?: string;
};

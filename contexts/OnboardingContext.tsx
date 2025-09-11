import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData } from '@/types/onboarding';

interface OnboardingContextType {
  onboardingData: Partial<OnboardingData>;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  resetOnboardingData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const resetOnboardingData = () => {
    setOnboardingData({});
    setCurrentStep(1);
  };

  const value: OnboardingContextType = {
    onboardingData,
    updateOnboardingData,
    resetOnboardingData,
    currentStep,
    setCurrentStep,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
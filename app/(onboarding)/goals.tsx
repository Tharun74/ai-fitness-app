import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Target,
  Zap,
  Heart,
  TrendingUp,
  Activity,
  Users,
} from 'lucide-react-native';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { SelectableCard } from '@/components/onboarding/SelectableCard';
import { CustomButton } from '@/components/onboarding/CustomButton';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { FitnessGoal } from '@/types/onboarding';

const fitnessGoals: FitnessGoal[] = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'Burn calories and lose weight effectively',
    icon: 'target',
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    description: 'Build strength and increase muscle mass',
    icon: 'zap',
  },
  {
    id: 'flexibility',
    title: 'Improve Flexibility',
    description: 'Increase range of motion and mobility',
    icon: 'heart',
  },
  {
    id: 'posture',
    title: 'Better Posture',
    description: 'Correct alignment and reduce back pain',
    icon: 'trending-up',
  },
  {
    id: 'endurance',
    title: 'Increase Endurance',
    description: 'Build cardiovascular fitness and stamina',
    icon: 'activity',
  },
  {
    id: 'stay-active',
    title: 'Stay Active',
    description: 'Maintain a healthy and active lifestyle',
    icon: 'users',
  },
];

export default function GoalsScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const { updateOnboardingData, setCurrentStep } = useOnboarding();

  const getGoalIcon = (iconName: string) => {
    const iconProps = { size: 24, color: '#2563EB' };
    switch (iconName) {
      case 'target': return <Target {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'heart': return <Heart {...iconProps} />;
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'activity': return <Activity {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      default: return <Target {...iconProps} />;
    }
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      } else {
        return [...prev, goalId];
      }
    });
  };

  const handleNext = () => {
    const goalTitles = selectedGoals.map(
      goalId => fitnessGoals.find(goal => goal.id === goalId)?.title || goalId
    );
    
    updateOnboardingData({ goals: goalTitles });
    setCurrentStep(3);
    router.push('/(onboarding)/fitness-level');
  };

  const stepTitles = ['Account', 'Goals', 'Level', 'Details'];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator
        currentStep={2}
        totalSteps={4}
        stepTitles={stepTitles}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>What are your main fitness goals?</Text>
          <Text style={styles.subtitle}>
            Select all that apply. We'll personalize your workouts based on your goals.
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {fitnessGoals.map((goal) => (
            <SelectableCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              isSelected={selectedGoals.includes(goal.id)}
              onPress={() => toggleGoal(goal.id)}
              icon={getGoalIcon(goal.icon)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <CustomButton
            title="Continue"
            onPress={handleNext}
            disabled={selectedGoals.length === 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  goalsContainer: {
    flex: 1,
  },
  footer: {
    paddingVertical: 24,
  },
});
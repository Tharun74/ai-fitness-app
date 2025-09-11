import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { SelectableCard } from '@/components/onboarding/SelectableCard';
import { CustomButton } from '@/components/onboarding/CustomButton';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { FitnessLevel } from '@/types/onboarding';

const fitnessLevels: FitnessLevel[] = [
  {
    id: 'Beginner',
    title: 'Beginner',
    description: "I'm new to fitness or haven't worked out in a while.",
  },
  {
    id: 'Intermediate',
    title: 'Intermediate',
    description: 'I work out regularly, a few times a week.',
  },
  {
    id: 'Advanced',
    title: 'Advanced',
    description: "I'm very experienced and comfortable with intense workouts.",
  },
];

export default function FitnessLevelScreen() {
  const [selectedLevel, setSelectedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | null>(null);
  const { updateOnboardingData, setCurrentStep } = useOnboarding();

  const handleNext = () => {
    if (selectedLevel) {
      updateOnboardingData({ fitness_level: selectedLevel });
      setCurrentStep(4);
      router.push('/(onboarding)/personal-details');
    }
  };

  const stepTitles = ['Account', 'Goals', 'Level', 'Details'];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator
        currentStep={3}
        totalSteps={4}
        stepTitles={stepTitles}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>How would you describe your current fitness level?</Text>
          <Text style={styles.subtitle}>
            This helps us create workouts that match your experience and abilities.
          </Text>
        </View>

        <View style={styles.levelsContainer}>
          {fitnessLevels.map((level) => (
            <SelectableCard
              key={level.id}
              title={level.title}
              description={level.description}
              isSelected={selectedLevel === level.id}
              onPress={() => setSelectedLevel(level.id)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <CustomButton
            title="Continue"
            onPress={handleNext}
            disabled={!selectedLevel}
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
  levelsContainer: {
    flex: 1,
  },
  footer: {
    paddingVertical: 24,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CustomTextInput } from '@/components/onboarding/CustomTextInput';
import { CustomButton } from '@/components/onboarding/CustomButton';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';

export default function PersonalDetailsScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    age?: string;
    height?: string;
    weight?: string;
  }>({});

  const { onboardingData, resetOnboardingData } = useOnboarding();

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
      newErrors.age = 'Please enter a valid age (13-120)';
    }

    const heightNum = parseFloat(height);
    if (!height || isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      newErrors.height = 'Please enter a valid height (100-250 cm)';
    }

    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
      newErrors.weight = 'Please enter a valid weight (30-300 kg)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinishSetup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          name: name.trim(),
          age: parseInt(age),
          height: parseFloat(height),
          weight: parseFloat(weight),
          fitness_level: onboardingData.fitness_level,
          goals: onboardingData.goals,
        });

      if (profileError) {
        throw profileError;
      }

      // Reset onboarding data and navigate to main app
      resetOnboardingData();
      router.replace('/(tabs)');
      
    } catch (error: any) {
      console.error('Profile creation error:', error);
      Alert.alert(
        'Setup Error',
        error.message || 'Failed to complete setup. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = ['Account', 'Goals', 'Level', 'Details'];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator
        currentStep={4}
        totalSteps={4}
        stepTitles={stepTitles}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            This information helps us create personalized workouts just for you.
          </Text>
        </View>

        <View style={styles.form}>
          <CustomTextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <CustomTextInput
            label="Age"
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
            error={errors.age}
          />

          <CustomTextInput
            label="Height"
            value={height}
            onChangeText={setHeight}
            placeholder="Enter your height"
            keyboardType="numeric"
            suffix="cm"
            error={errors.height}
          />

          <CustomTextInput
            label="Weight"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter your weight"
            keyboardType="numeric"
            suffix="kg"
            error={errors.weight}
          />
        </View>

        <View style={styles.footer}>
          <CustomButton
            title="Finish Setup"
            onPress={handleFinishSetup}
            loading={loading}
            disabled={!name || !age || !height || !weight}
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
  form: {
    flex: 1,
  },
  footer: {
    paddingVertical: 24,
  },
});
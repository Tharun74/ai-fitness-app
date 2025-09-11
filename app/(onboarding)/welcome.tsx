import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CustomTextInput } from '@/components/onboarding/CustomTextInput';
import { CustomButton } from '@/components/onboarding/CustomButton';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';

export default function WelcomeScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { updateOnboardingData, setCurrentStep } = useOnboarding();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Check if user has completed onboarding
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            // User has completed onboarding, navigate to main app
            router.replace('/(tabs)');
          } else {
            // User needs to complete onboarding
            updateOnboardingData({ email });
            setCurrentStep(2);
            router.push('/(onboarding)/goals');
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          updateOnboardingData({ email, password });
          setCurrentStep(2);
          router.push('/(onboarding)/goals');
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = ['Account', 'Goals', 'Level', 'Details'];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator
        currentStep={1}
        totalSteps={4}
        stepTitles={stepTitles}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Zap size={48} color="#2563EB" />
          </View>
          <Text style={styles.title}>
            {isLogin ? 'Welcome Back!' : 'Your Personal AI Fitness Coach'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? 'Sign in to continue your fitness journey'
              : 'Get personalized workouts and real-time posture feedback'}
          </Text>
        </View>

        <View style={styles.form}>
          <CustomTextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          <CustomButton
            title={isLogin ? 'Sign In' : 'Create Account'}
            onPress={handleAuth}
            loading={loading}
            disabled={!email || !password}
            style={styles.authButton}
          />

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
          >
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Text style={styles.switchLink}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#EBF4FF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    paddingBottom: 32,
  },
  authButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  switchButton: {
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#64748B',
  },
  switchLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
import { Stack } from 'expo-router';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="goals" />
        <Stack.Screen name="fitness-level" />
        <Stack.Screen name="personal-details" />
      </Stack>
    </OnboardingProvider>
  );
}
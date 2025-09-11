import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/components/AuthProvider';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user?.profile) {
        // User is authenticated and has completed onboarding
        router.replace('/(tabs)');
      } else {
        // User needs to authenticate or complete onboarding
        router.replace('/(onboarding)/welcome');
      }
    }
  }, [user, isLoading]);

  return <LoadingSpinner message="Loading your fitness journey..." />;
}
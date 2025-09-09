import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

// Workout-specific storage functions
export const storeWorkoutHistory = async (workoutData: any): Promise<void> => {
  const existingHistory = await getData<any[]>('workoutHistory') || [];
  const updatedHistory = [...existingHistory, { ...workoutData, timestamp: Date.now() }];
  await storeData('workoutHistory', updatedHistory);
};

export const getWorkoutHistory = async (): Promise<any[]> => {
  return await getData<any[]>('workoutHistory') || [];
};

export const storeUserProgress = async (progressData: any): Promise<void> => {
  await storeData('userProgress', progressData);
};

export const getUserProgress = async (): Promise<any | null> => {
  return await getData('userProgress');
};
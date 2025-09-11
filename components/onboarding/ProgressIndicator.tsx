import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${(currentStep / totalSteps) * 100}%` },
          ]}
        />
      </View>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          
          return (
            <View key={stepNumber} style={styles.stepContainer}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.completedStep,
                  isActive && styles.activeStep,
                ]}
              >
                {isCompleted ? (
                  <Check size={12} color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive && styles.activeStepNumber,
                    ]}
                  >
                    {stepNumber}
                  </Text>
                )}
              </View>
              <Text style={styles.stepTitle}>{stepTitles[index]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  completedStep: {
    backgroundColor: '#10B981',
  },
  activeStep: {
    backgroundColor: '#2563EB',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeStepNumber: {
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
});
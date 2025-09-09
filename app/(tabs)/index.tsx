import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Play,
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  Zap,
} from 'lucide-react-native';

export default function HomeScreen() {
  const [userName, setUserName] = useState('Alex');
  const [todaysWorkout, setTodaysWorkout] = useState({
    name: 'Full Body Strength',
    duration: '45 min',
    exercises: 12,
  });
  const [weeklyStats, setWeeklyStats] = useState({
    workoutsCompleted: 4,
    totalWorkouts: 6,
    caloriesBurned: 1250,
    avgPostureScore: 85,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{userName}!</Text>
          </View>
          <View style={styles.streakContainer}>
            <Zap size={20} color="#F59E0B" />
            <Text style={styles.streakText}>7 day streak</Text>
          </View>
        </View>

        {/* Today's Workout Card */}
        <View style={styles.todayWorkoutCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Today's Workout</Text>
              <Text style={styles.workoutName}>{todaysWorkout.name}</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.workoutDetails}>
            <View style={styles.workoutStat}>
              <Text style={styles.statValue}>{todaysWorkout.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.workoutStat}>
              <Text style={styles.statValue}>{todaysWorkout.exercises}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>This Week's Progress</Text>
          <View style={styles.progressGrid}>
            <View style={[styles.progressCard, styles.primaryCard]}>
              <Calendar size={24} color="#2563EB" />
              <Text style={styles.progressValue}>
                {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}
              </Text>
              <Text style={styles.progressLabel}>Workouts</Text>
            </View>
            <View style={[styles.progressCard, styles.successCard]}>
              <Trophy size={24} color="#10B981" />
              <Text style={styles.progressValue}>{weeklyStats.caloriesBurned}</Text>
              <Text style={styles.progressLabel}>Calories</Text>
            </View>
            <View style={[styles.progressCard, styles.warningCard]}>
              <Target size={24} color="#F59E0B" />
              <Text style={styles.progressValue}>{weeklyStats.avgPostureScore}%</Text>
              <Text style={styles.progressLabel}>Posture</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Camera size={32} color="#2563EB" />
              <Text style={styles.quickActionText}>AI Posture Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <TrendingUp size={32} color="#10B981" />
              <Text style={styles.quickActionText}>View Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            "The groundwork for all happiness is good health."
          </Text>
          <Text style={styles.quoteAuthor}>- Leigh Hunt</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706',
  },
  todayWorkoutCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#2563EB',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  workoutStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  primaryCard: {
    backgroundColor: '#EBF4FF',
  },
  successCard: {
    backgroundColor: '#ECFDF5',
  },
  warningCard: {
    backgroundColor: '#FFFBEB',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 8,
  },
  quoteCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  quote: {
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },
});
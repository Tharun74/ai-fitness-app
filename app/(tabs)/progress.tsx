import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Flame,
  Clock,
  Zap,
} from 'lucide-react-native';

interface ProgressData {
  workouts: number;
  calories: number;
  minutes: number;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  progress: number;
  target: number;
  icon: string;
}

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const { width } = useWindowDimensions();
  
  const weeklyData: ProgressData = {
    workouts: 4,
    calories: 1250,
    minutes: 180,
    streak: 7,
  };

  const monthlyData: ProgressData = {
    workouts: 18,
    calories: 5200,
    minutes: 720,
    streak: 7,
  };

  const yearlyData: ProgressData = {
    workouts: 156,
    calories: 42000,
    minutes: 6240,
    streak: 7,
  };

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      case 'year': return yearlyData;
      default: return weeklyData;
    }
  };

  const renderChart = () => {
    const maxValue = Math.max(...weeklyChart);
    const minValue = Math.min(...weeklyChart);
    const range = maxValue - minValue || 1;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Posture Score</Text>
        <View style={[styles.chart, { width: chartWidth, height: chartHeight }]}>
          <View style={styles.chartLine}>
            {weeklyChart.map((value, index) => {
              const height = ((value - minValue) / range) * (chartHeight - 40) + 20;
              return (
                <View key={index} style={styles.chartPoint}>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height,
                        backgroundColor: value >= 85 ? '#10B981' : value >= 70 ? '#F59E0B' : '#EF4444',
                      },
                    ]}
                  />
                  <Text style={styles.chartLabel}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Week Warrior',
      description: 'Complete 5 workouts in a week',
      earned: false,
      progress: 4,
      target: 5,
      icon: 'calendar',
    },
    {
      id: '2',
      title: 'Posture Pro',
      description: 'Maintain 90%+ posture score for 10 workouts',
      earned: true,
      progress: 10,
      target: 10,
      icon: 'target',
    },
    {
      id: '3',
      title: 'Streak Master',
      description: 'Maintain a 30-day workout streak',
      earned: false,
      progress: 7,
      target: 30,
      icon: 'flame',
    },
    {
      id: '4',
      title: 'Calorie Crusher',
      description: 'Burn 10,000 calories in total',
      earned: false,
      progress: 5200,
      target: 10000,
      icon: 'zap',
    },
  ];

  const weeklyChart = [65, 78, 82, 90, 88, 92, 85];
  const chartHeight = 120;
  const chartWidth = width - 80;

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar': return <Calendar size={24} color="#2563EB" />;
      case 'target': return <Target size={24} color="#10B981" />;
      case 'flame': return <Flame size={24} color="#EF4444" />;
      case 'zap': return <Zap size={24} color="#F59E0B" />;
      default: return <Trophy size={24} color="#64748B" />;
    }
  };

  const currentData = getCurrentData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <View style={styles.periodSelector}>
            {(['week', 'month', 'year'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriodButton,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === period && styles.selectedPeriodButtonText,
                  ]}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Calendar size={24} color="#2563EB" />
            <Text style={styles.statValue}>{currentData.workouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statCard}>
            <Flame size={24} color="#EF4444" />
            <Text style={styles.statValue}>{currentData.calories.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color="#10B981" />
            <Text style={styles.statValue}>{currentData.minutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#F59E0B" />
            <Text style={styles.statValue}>{currentData.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Chart */}
        {renderChart()}

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                {getAchievementIcon(achievement.icon)}
              </View>
              <View style={styles.achievementContent}>
                <View style={styles.achievementHeader}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  {achievement.earned && (
                    <Award size={16} color="#10B981" />
                  )}
                </View>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%`,
                          backgroundColor: achievement.earned ? '#10B981' : '#2563EB',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {achievement.progress}/{achievement.target}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#2563EB',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedPeriodButtonText: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    margin: '1%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  chart: {
    alignItems: 'center',
  },
  chartLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: chartHeight,
  },
  chartPoint: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
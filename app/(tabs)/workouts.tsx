import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  Clock,
  Zap,
  Users,
  Play,
  Heart,
} from 'lucide-react-native';

interface Workout {
  id: string;
  name: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  exercises: number;
  calories: number;
  equipment: string[];
  description: string;
}

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Flexibility'];
  
  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Morning Energy Boost',
      duration: 20,
      difficulty: 'Beginner',
      category: 'Cardio',
      exercises: 8,
      calories: 200,
      equipment: ['None'],
      description: 'Start your day with this energizing cardio routine',
    },
    {
      id: '2',
      name: 'Full Body Strength',
      duration: 45,
      difficulty: 'Intermediate',
      category: 'Strength',
      exercises: 12,
      calories: 350,
      equipment: ['Dumbbells'],
      description: 'Build muscle with compound movements',
    },
    {
      id: '3',
      name: 'Yoga Flow',
      duration: 30,
      difficulty: 'Beginner',
      category: 'Yoga',
      exercises: 10,
      calories: 150,
      equipment: ['Yoga Mat'],
      description: 'Improve flexibility and mindfulness',
    },
    {
      id: '4',
      name: 'HIIT Blast',
      duration: 25,
      difficulty: 'Advanced',
      category: 'HIIT',
      exercises: 6,
      calories: 400,
      equipment: ['None'],
      description: 'High-intensity interval training for maximum burn',
    },
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#64748B';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search workouts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              selectedCategory === category && styles.selectedCategoryPill,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {filteredWorkouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDescription}>{workout.description}</Text>
                <View style={styles.workoutMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color="#64748B" />
                    <Text style={styles.metaText}>{workout.duration}min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Zap size={14} color="#64748B" />
                    <Text style={styles.metaText}>{workout.calories} cal</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users size={14} color="#64748B" />
                    <Text style={styles.metaText}>{workout.exercises} exercises</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.workoutFooter}>
              <View style={styles.difficultyContainer}>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(workout.difficulty) },
                  ]}
                >
                  <Text style={styles.difficultyText}>{workout.difficulty}</Text>
                </View>
                <Text style={styles.categoryLabel}>{workout.category}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedCategoryPill: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  playButton: {
    backgroundColor: '#2563EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 4,
  },
});
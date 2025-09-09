import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit, Bell, Shield, CircleHelp as HelpCircle, Settings, LogOut, ChevronRight, Camera, Save } from 'lucide-react-native';

interface UserProfile {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: string[];
}

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    age: 28,
    height: 175,
    weight: 72,
    fitnessLevel: 'Intermediate',
    goals: ['Weight Loss', 'Strength Building', 'Better Posture'],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const saveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const cancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const menuItems = [
    {
      icon: <Bell size={20} color="#64748B" />,
      title: 'Notifications',
      subtitle: 'Manage workout reminders',
      action: () => console.log('Notifications'),
      showChevron: true,
    },
    {
      icon: <Shield size={20} color="#64748B" />,
      title: 'Privacy & Security',
      subtitle: 'Data and account settings',
      action: () => console.log('Privacy'),
      showChevron: true,
    },
    {
      icon: <HelpCircle size={20} color="#64748B" />,
      title: 'Help & Support',
      subtitle: 'Get assistance and FAQs',
      action: () => console.log('Help'),
      showChevron: true,
    },
    {
      icon: <Settings size={20} color="#64748B" />,
      title: 'App Settings',
      subtitle: 'Customize your experience',
      action: () => console.log('Settings'),
      showChevron: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            onPress={isEditing ? saveProfile : () => setIsEditing(true)}
            style={styles.editButton}
          >
            {isEditing ? (
              <Save size={20} color="#2563EB" />
            ) : (
              <Edit size={20} color="#2563EB" />
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#64748B" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={editedProfile.name}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
                  placeholder="Full Name"
                />
                <TextInput
                  style={styles.editInput}
                  value={editedProfile.email}
                  onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </>
            ) : (
              <>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileEmail}>{profile.email}</Text>
              </>
            )}
          </View>
        </View>

        {/* Fitness Details */}
        <View style={styles.fitnessCard}>
          <Text style={styles.sectionTitle}>Fitness Profile</Text>
          <View style={styles.fitnessGrid}>
            <View style={styles.fitnessItem}>
              <Text style={styles.fitnessLabel}>Age</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fitnessInput}
                  value={editedProfile.age.toString()}
                  onChangeText={(text) => setEditedProfile({ 
                    ...editedProfile, 
                    age: parseInt(text) || 0 
                  })}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fitnessValue}>{profile.age}</Text>
              )}
            </View>
            
            <View style={styles.fitnessItem}>
              <Text style={styles.fitnessLabel}>Height (cm)</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fitnessInput}
                  value={editedProfile.height.toString()}
                  onChangeText={(text) => setEditedProfile({ 
                    ...editedProfile, 
                    height: parseInt(text) || 0 
                  })}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fitnessValue}>{profile.height}</Text>
              )}
            </View>
            
            <View style={styles.fitnessItem}>
              <Text style={styles.fitnessLabel}>Weight (kg)</Text>
              {isEditing ? (
                <TextInput
                  style={styles.fitnessInput}
                  value={editedProfile.weight.toString()}
                  onChangeText={(text) => setEditedProfile({ 
                    ...editedProfile, 
                    weight: parseInt(text) || 0 
                  })}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fitnessValue}>{profile.weight}</Text>
              )}
            </View>
            
            <View style={styles.fitnessItem}>
              <Text style={styles.fitnessLabel}>Level</Text>
              <Text style={styles.fitnessValue}>{profile.fitnessLevel}</Text>
            </View>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.goalsCard}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          <View style={styles.goalsList}>
            {profile.goals.map((goal, index) => (
              <View key={index} style={styles.goalChip}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleItem}>
            <View style={styles.toggleInfo}>
              <Bell size={20} color="#64748B" />
              <Text style={styles.toggleTitle}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
              thumbColor={notificationsEnabled ? '#2563EB' : '#64748B'}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                {item.icon}
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              {item.showChevron && (
                <ChevronRight size={16} color="#94A3B8" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        {!isEditing && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
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
  editButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
  },
  editInput: {
    fontSize: 16,
    color: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
    marginBottom: 8,
  },
  fitnessCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  fitnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fitnessItem: {
    width: '50%',
    marginBottom: 16,
  },
  fitnessLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  fitnessValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  fitnessInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 4,
  },
  goalsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  goalsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goalChip: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  goalText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  toggleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
});
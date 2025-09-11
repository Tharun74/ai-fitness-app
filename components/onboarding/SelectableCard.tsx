import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';

interface SelectableCardProps {
  title: string;
  description?: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  isSelected,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={[styles.title, isSelected && styles.selectedTitle]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, isSelected && styles.selectedDescription]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <View style={[styles.checkbox, isSelected && styles.selectedCheckbox]}>
        {isSelected && <Check size={16} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderColor: '#2563EB',
    backgroundColor: '#EBF4FF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  selectedTitle: {
    color: '#2563EB',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  selectedDescription: {
    color: '#1E40AF',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  selectedCheckbox: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
});
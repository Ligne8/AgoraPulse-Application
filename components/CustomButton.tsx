import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, DimensionValue } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  IconComponent?: React.ComponentType<any>; // Accepts any Expo Icon component
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  width?: DimensionValue;
  marginBottom?: number; 
  style?: ViewStyle; 
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  backgroundColor = 'white',
  textColor = '#0E3D60',
  IconComponent = Ionicons, // Default to Ionicons
  iconName,
  iconColor = '#FFFFFF',
  iconSize,
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress}>
      {iconName && IconComponent && (
        <IconComponent name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
      )}
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

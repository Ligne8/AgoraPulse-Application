import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: IconDefinition;
  iconColor?: string;
  style?: ViewStyle; // Accepts additional styles for the button
  textStyle?: TextStyle; // Accepts additional styles for the text
}

export default function CustomButton({
  title,
  onPress,
  backgroundColor = 'white',
  textColor = '#0E3D60',
  icon,
  iconColor = '#FFFFFF',
  style,
  textStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress}>
      {icon && <FontAwesomeIcon icon={icon} size={22} color={iconColor} style={styles.icon} />}
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
    marginRight: 10, // Space between icon and text
  },
});

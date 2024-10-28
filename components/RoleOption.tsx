import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface RoleOptionProps {
  icon: IconDefinition;
  iconColor?: string;
  title: string;
  highlightTitle?: string;
  description: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export default function RoleOption({
  icon,
  iconColor = '#000',
  title,
  highlightTitle,
  description,
  onPress,
  backgroundColor = '#fff',
  textColor = '#000',
}: RoleOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.roleBox, { backgroundColor: `${backgroundColor}1A`, borderColor: iconColor }]}
      onPress={onPress}
    >
      <FontAwesomeIcon icon={icon} size={75} color={iconColor} />
      <Text style={[styles.roleTitle, { color: textColor }]}>
        {title}
        <Text style={[styles.roleHighlightTitle, { color: iconColor }]}>{highlightTitle}</Text>
      </Text>
      <Text style={styles.roleDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roleBox: {
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  roleTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginBottom: 10,
  },
  roleHighlightTitle: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    marginTop: 10,
    marginBottom: 10,
  },
  roleDescription: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});

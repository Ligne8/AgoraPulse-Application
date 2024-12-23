import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface EntryFieldProps {
  icon: IconDefinition;
  iconColor?: string;
  title: string;
  placeholder: string;
  backgroundColor?: string;
  descriptionColor?: string;
  secureText?: boolean;
  multiline?: boolean;
  marginBottom?: number;
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void;
  value: string;
}

export default function EntryFieldDefaultValue({
  icon,
  iconColor = '#0E3D60',
  title,
  placeholder,
  backgroundColor = '#f2f2f2',
  descriptionColor = '#6c7a93',
  secureText = false,
  multiline = false,
  marginBottom = 15,
  onChangeText,
  value,
}: EntryFieldProps) {
  return (
    <View style={[styles.container, { backgroundColor, marginBottom }]}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} size={20} color={iconColor} />
      </View>
      <View style={[styles.textContainer, multiline && styles.textContainerMultiline]}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={descriptionColor}
          style={[styles.input, multiline && styles.inputMultiline]}
          secureTextEntry={secureText}
          multiline={multiline}
          onChangeText={onChangeText}
          value={value}
          textAlignVertical={multiline ? 'top' : 'center'} // align text to top if multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    width: '100%',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainerMultiline: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E3D60',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#6c7a93',
  },
  inputMultiline: {
    height: 100,
  },
});

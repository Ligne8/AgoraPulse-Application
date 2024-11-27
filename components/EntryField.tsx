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
  inputHeight?: number;
  marginBottom?: number;
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void;
}

export default function EntryField({
  icon,
  iconColor = '#0E3D60',
  title,
  placeholder,
  backgroundColor = '#f2f2f2',
  descriptionColor = '#6c7a93',
  inputHeight = 20,
  secureText = false,
  multiline = false,
  marginBottom = 15,
  onChangeText,
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
          style={[styles.input, multiline && styles.inputMultiline, { height: inputHeight }]}
          secureTextEntry={secureText}
          multiline={multiline}
          textAlignVertical={multiline || inputHeight > 20 ? 'top' : 'center'} // Align text at the top if height > 20        />
          onChangeText={onChangeText}
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
    width: '100%',
  },
  inputMultiline: {
    height: 40,
  },
});

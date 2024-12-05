import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

export const ModalInput = ({
                             placeholder,
                             onChangeText,
                           }: {
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChangeText: (text: string) => void;
}) => (
  <TextInput
    style={styles.modalInput}
    placeholder={placeholder}
    onChangeText={onChangeText}
    placeholderTextColor="#B0B0B0"
  />
);

const styles = StyleSheet.create({
  modalInput: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
    borderRadius: 100,
    height: 50,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'MontserratBold',
    color: '#0E3D60',
  },
});

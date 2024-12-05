import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export const ModalButton = ({
                       title,
                       onPress,
                       backgroundColor,
                       textColor,
                     }: {
  title: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}) => (
  <TouchableOpacity style={[styles.modalButton, { backgroundColor }]} onPress={onPress}>
<Text style={[styles.modalButtonText, { color: textColor }]}>{title}</Text>
</TouchableOpacity>
);

const styles = StyleSheet.create({
  modalButton: {
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 100,
    height: 50,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: 'MontserratBold',
    color: '#0E3D60',
    textAlign: 'center',
  },
});
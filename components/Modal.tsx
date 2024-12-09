import React from 'react';
import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native';

type PROP = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

export const Modal = ({ isOpen, withInput, children, ...rest }: PROP) => {
  const content = withInput ? (
    <KeyboardAvoidingView style={styles.centeredView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.centeredView}>{children}</View>
  );
  return (
    <RNModal visible={isOpen} transparent animationType="fade" statusBarTranslucent {...rest}>
      {content}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 22,
    paddingBottom: 50,
  },
});

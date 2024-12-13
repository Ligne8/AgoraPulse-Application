import React from 'react';
import Toast, { BaseToast, ErrorToast, ToastConfig, ToastShowParams } from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  success: (props: ToastShowParams) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4CAF50',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        marginTop: 20,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: '#6c757d',
      }}
    />
  ),
  error: (props: ToastShowParams) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#f44336',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        marginTop: 20,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        color: '#6c757d',
      }}
    />
  ),
};

const ToastComponent: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export default ToastComponent;

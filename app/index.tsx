import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import useBLE from '@/components/BLEScanner';

const App = () => {
  const { connectToDevice, color } = useBLE();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <Button title="Connecter au périphérique" onPress={connectToDevice} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default App;

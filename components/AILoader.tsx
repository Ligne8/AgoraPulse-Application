import { ActivityIndicator, Text, View } from 'react-native';
import React from 'react';

const Loader = (props: { text: string }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0E3D60" />
      <Text style={{ fontSize: 20, color: '#0E3D60', marginTop: 10 }}>{props.text} </Text>
    </View>
  );
};

export default Loader;

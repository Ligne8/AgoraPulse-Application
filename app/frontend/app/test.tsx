import {View, Text} from 'react-native';
import React from 'react';

function test() {
    let i = 0;
    console.log(i);
    return i;
}
const Test = () => {
    return (
           <View className="max-h-none">
               <Text>Test</Text>
           </View>
    );
};
export default Test;
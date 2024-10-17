import {View, Text} from 'react-native';
import React  from 'react';

function test() {
    let i = 0;
    console.log(i);
    return i;
}
const Test = () => {
    return (
        <div>
           <View className="max-h-none">
               <Text>Test</Text>
           </View>
        </div>
    );
};
export default Test;
import {View, Text} from 'react-native';

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
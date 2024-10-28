import React from 'react';
import {Text, TouchableOpacity, StyleSheet, DimensionValue} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    width?: DimensionValue;
    marginBottom?: number; // New optional prop for margin
}

export default function CustomButton({
                                         title,
                                         onPress,
                                         backgroundColor = 'white',
                                         textColor = '#0E3D60',
                                         width,
                                         marginBottom = 10, // Default marginBottom if not provided
                                     }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor, width: width ? width : 'auto', marginBottom}]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, {color: textColor}]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'MontserratBold',
        textAlign: 'center',
    },
});

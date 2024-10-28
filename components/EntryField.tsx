import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface EntryFieldProps {
    icon: IconDefinition;
    iconColor?: string;
    title: string;
    placeholder: string;
    backgroundColor?: string;
    descriptionColor?: string;
    secureText?: boolean;
}

export default function EntryField({
                                       icon,
                                       iconColor = '#0E3D60',
                                       title,
                                       placeholder,
                                       backgroundColor = '#f2f2f2',
                                       descriptionColor = '#6c7a93',
                                       secureText = false,
                                   }: EntryFieldProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={20} color={iconColor} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={descriptionColor}
                    style={styles.input}
                    secureTextEntry={secureText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        width: '100%',
        marginBottom: 15,
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0E3D60',
        marginBottom: 5,
    },
    input: {
        fontSize: 14,
        color: '#6c7a93',
    },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../src/res/colors';

export default function AppButton({ title, onPress, color = 'secondary' }) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[color] }]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%'
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase'
    }
});
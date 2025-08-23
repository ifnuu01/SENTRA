import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function GlassTabBarBackground() {
    return (
        <BlurView intensity={50} tint="light" style={styles.blurContainer}>

        </BlurView>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
    },
});
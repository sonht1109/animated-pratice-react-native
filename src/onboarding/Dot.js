import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

export default function Dot({color, scaleStyle}) {
    console.log(color)
    return (
        <Animated.View style={[styles.dot, {
            transform: [
                {scale: scaleStyle}
            ],
            backgroundColor: color
        }]} />
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#2cb9b0",
        marginHorizontal: 3
    }
})

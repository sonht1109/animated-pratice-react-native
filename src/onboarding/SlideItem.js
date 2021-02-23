import React from 'react'
import { Dimensions, StyleSheet, Text, View, Animated, Image } from 'react-native'

const { width, height } = Dimensions.get('window')
const LABEL_HEIGHT = 100
const SLIDE_HEIGHT = height * 0.6

export default function SlideItem({ label, bgColor, isRight, image, isReverse }) {

    const transformStyle = {
        transform: [
            { translateY: (SLIDE_HEIGHT - LABEL_HEIGHT) / 2 },
            { translateX: isRight ? (width - LABEL_HEIGHT) / 2 : -(width - LABEL_HEIGHT) / 2 },
            { rotate: isReverse ? '90deg' : '-90deg' },
        ]
    }

    return (
        <Animated.View style={[styles.slide, {backgroundColor: "transparent"}]}>
            <View style={[styles.labelWrapper, { ...transformStyle }]}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    slide: {
        width: width, height: SLIDE_HEIGHT,
        backgroundColor: "white",
    },
    labelWrapper: {
        height: LABEL_HEIGHT,
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
        color: "white",
        fontSize: 80,
        fontWeight: "bold"
    },
    imageWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: 'center'
        // zIndex: 10
    },
})

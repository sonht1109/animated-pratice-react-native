import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

export default function Action({pan}) {
    return (
        <Animated.View
        style={{
            width: 100,
            backgroundColor: "yellow"
        }}
        >
            <Text>123</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({})

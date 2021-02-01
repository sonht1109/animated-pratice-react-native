import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

export default function ScaleButton() {

    const scaleValue = new Animated.Value(0)

    const scale = () => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease
        }).start()
    }

    return (
        <TouchableWithoutFeedback
            onPress={scale}
        >
            <Animated.View style={{transform: [{scale: scaleValue.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [1, 1.1, 1]
            })}]}}>
                <Text style={[styles.button]}>
                    Scalable Button
            </Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: "green",
        color: "white",
        marginVertical: 20
    }
})

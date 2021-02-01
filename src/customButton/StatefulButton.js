import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

export default function StatefulButton() {

    const [isLoading, setIsLoading] = useState(false)
    // const animated = new Animated.Value(0)

    const loading = () => {
        setIsLoading(prev => !prev)
        // console.log('loading');
        // animated.setValue(0)
        // Animated.timing(animated, {
        //     toValue: 100,
        //     duration: 3000,
        //     easing: Easing.linear
        // }).start(() => {
        //     setIsLoading(false)
        // })
    }

    return (
        <TouchableOpacity
            onPress={loading}
        >
            <Animated.View style={[styles.button]}>
                {
                    isLoading &&
                    <ActivityIndicator
                        color="white"
                        size="small"
                        style={{ marginRight: 10 }}
                    />
                }
                <Text style={{ color: "white" }}>
                    {isLoading ? "Loading ..." : "Stateful Button"}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginVertical: 20,
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: "#000000"
    }
})

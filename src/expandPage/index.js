import React, { useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ExpandPage() {

    const Y = new Animated.Value(0)
    const [expand, setExpand] = useState(true)
    // const expand = useRef(true).current

    const toggleExpand = () => {
        Y.setValue(0)
        Animated.spring(Y, {
            duration: 300,
            toValue: 1,
            easing: Easing.linear,
            // friction: 3, 
            useNativeDriver: true
        }).start(() => {
            setExpand(prev => !prev)
        })
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.innerContainer, {
                transform: [{
                    translateY: Y.interpolate({
                        inputRange: [0, 1],
                        // outputRange: expand ? [0, 500] : [0, -500]
                        outputRange: expand ? [0, 500] : [500, 0]
                    })
                }]
            }]}>
                <TouchableOpacity onPress={toggleExpand}>
                    <Text style={{ color: 'black', padding: 20, backgroundColor: "white" }}>Touch here</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.element}>1st Component</Text>
                    <Text style={styles.element}>2nd Component</Text>
                    <Text style={styles.element}>3rd Component</Text>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    innerContainer: {
        flex: 0.8,
        backgroundColor: "black",
        width: "100%",
        alignItems: "center",
    },
    element: {
        backgroundColor: "white",
        color: "black",
        fontSize: 20,
        padding: 20,
        marginVertical: 20
    }
})

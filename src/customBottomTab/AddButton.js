import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View, TouchableOpacity, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function AddButton() {

    const rotateAnimate = new Animated.Value(0)
    const scaleAnimate = new Animated.Value(0)

    const onPress = () => {
        console.log(rotateAnimate)
        scaleAnimate.setValue(0)
        Animated.parallel([
            Animated.timing(scaleAnimate, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(rotateAnimate, {
                toValue: 1 - rotateAnimate._value,
                duration: 200,
                useNativeDriver: false
            })
        ]).start()
    }

    const rotateStyle = {
        transform: [{
            rotate: rotateAnimate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '45deg']
            })
        }]
    }

    const scaleStyle = {
        transform: [{
            scale: scaleAnimate.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0.9, 1]
            })
        }]
    }

    const thermometerX = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100]
    })
    const thermometerY = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    })

    const heartX = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0]
    })
    const heartY = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -150]
    })

    const musicX = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    })
    const musicY = rotateAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    })

    return (
        <View style={{position: 'relative', alignItems: "center"}}>
            {/* therometer */}
            <Animated.View style={[styles.secondaryButton, {
                transform: [
                    {translateX: thermometerX},
                    {translateY: thermometerY},
                ]
            }]}>
                <View>
                    <Icon name="thermometer-outline" size={20} color="white" />
                </View>
            </Animated.View>
            {/* heart */}
            <Animated.View style={[styles.secondaryButton, {
                transform: [
                    {translateX: heartX},
                    {translateY: heartY},
                ]
            }]}>
                <View>
                    <Icon name="heart-outline" size={20} color="white" />
                </View>
            </Animated.View>
            {/* music */}
            <Animated.View style={[styles.secondaryButton, {
                transform: [
                    {translateX: musicX},
                    {translateY: musicY},
                ]
            }]}>
                <View>
                    <Icon name="musical-notes-outline" size={20} color="white" />
                </View>
            </Animated.View>
            {/* add */}
            <Animated.View style={[styles.addButton, scaleStyle]}>
                <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}>
                    <Animated.View style={[rotateStyle]}>
                        <Icon name="add-outline" size={35} color="white" />
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#7f58ff",
        position: 'absolute',
        width: 72,
        height: 72,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 36,
        top: -50,
        elevation: 5,
        borderWidth: 3,
        borderColor: "white"
    },
    secondaryButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#7f58ff",
        justifyContent: "center",
        alignItems: "center"
    }
})

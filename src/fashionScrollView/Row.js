import React from 'react'
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native'

const {height} = Dimensions.get('window')
const MIN_HEIGHT = 128
const MAX_HEIGHT = height/2

export default function Row({y, image, title, subtitle, index}) {

    const inputRange = [(index-1)*MAX_HEIGHT, index*MAX_HEIGHT]
    const heightStyle = y.interpolate({
        inputRange,
        outputRange: [MIN_HEIGHT, MAX_HEIGHT],
        extrapolate: "clamp"
    })
    const subtitleOpacityStyle = y.interpolate({
        inputRange,
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })
    const titleTranslateStyle = y.interpolate({
        inputRange,
        outputRange: [40, 0],
        extrapolate: 'clamp'
    })
    
    return (
        <Animated.View style={{height: heightStyle, justifyContent: "flex-end"}}>
            <View style={{...StyleSheet.absoluteFillObject}}>
                <Image source={image} style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                    resizeMode: 'cover'
                }}/>
                <View style={styles.overlay} />
            </View>
            <Animated.View style={{marginVertical: 30, maxHeight: MIN_HEIGHT}}>
                <Animated.Text style={[styles.title, {
                    transform: [
                        {translateY: titleTranslateStyle}
                    ]
                }]}>
                    {title}
                </Animated.Text>
                <Animated.Text style={[styles.subtitle, {opacity: subtitleOpacityStyle}]}>
                    {subtitle}
                </Animated.Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        textTransform: "uppercase",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 2,
        // transform: [{translateY: 30}]
    },
    subtitle: {
        textAlign: 'center',
        textTransform: "uppercase",
        color: "white",
        fontSize: 36,
        fontWeight: "bold",
        letterSpacing: 5,
        marginVertical: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
})
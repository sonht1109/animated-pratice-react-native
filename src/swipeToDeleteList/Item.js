import React, { useRef } from 'react'
import { StyleSheet, Text, Animated, PanResponder, Dimensions, View } from 'react-native'

const HEIGHT = 60
const { width } = Dimensions.get('window')

export default function Item({ item }) {

    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const heightAnimated = useRef(new Animated.Value(HEIGHT)).current
    const borderWidthAnimated = useRef(new Animated.Value(0)).current
    const actionWidthAnimated = pan.x.interpolate({
        inputRange: [-width, 0],
        outputRange: [width, 0]
    })
    const actionHeightAnimated = pan.x.interpolate({
        inputRange: [-9999, -width, -HEIGHT, 0],
        outputRange: [0, HEIGHT, HEIGHT, 0]
    })
    const borderRadius = pan.x.interpolate({
        inputRange: [-width, -HEIGHT-20, 0],
        outputRange: [0, 0, HEIGHT]
    })
    const opacityAnimated = pan.x.interpolate({
        inputRange: [-120, -100, 0],
        outputRange: [0, 1, 1]
    })

    const onRemoveAnimated = () => {
        Animated.parallel([
            Animated.timing(pan, {
                toValue: { x: -9999, y: 0 },
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(heightAnimated, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(borderWidthAnimated, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start()
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                })
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ]
            ),
            onPanResponderRelease: () => {
                if (pan.x._value < -width * 0.6) {
                    onRemoveAnimated()
                }
                else if (pan.x._value < -100) {
                    Animated.spring(pan, {
                        toValue: { x: -100, y: 0 },
                        friction: 5,
                        useNativeDriver: false
                    }).start()
                }
                else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5,
                        useNativeDriver: false
                    }).start()
                }
            }
        })
    ).current

    return (
        <Animated.View>
            <View style={styles.actions}>
                <Animated.View
                    style={{
                        width: actionWidthAnimated,
                        height: actionHeightAnimated,
                        borderRadius,
                        justifyContent: "center",
                        alignItems: 'center',
                        backgroundColor: "red"
                    }}
                >
                    <Animated.View style={{
                        width: 20,
                        height: 5,
                        backgroundColor: "white",
                        opacity: opacityAnimated
                    }}
                    />
                    <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: Animated.subtract(1, opacityAnimated)
                    }}
                    >
                        <Text style={{color: "white"}}>Remove</Text>
                    </Animated.View>
                </Animated.View>
            </View>
            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.item, {
                    height: heightAnimated,
                    borderWidth: borderWidthAnimated,
                    transform: [
                        { translateX: pan.x },
                    ]
                }]}
            >
                <Text numberOfLines={1}>{item.title}</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 10,
        justifyContent: "center",
        zIndex: 10,
        backgroundColor: 'white'
    },
    actions: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center'
    }
})
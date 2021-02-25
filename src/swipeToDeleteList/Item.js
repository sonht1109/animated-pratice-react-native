import React, { useRef } from 'react'
import { StyleSheet, Text, Animated, PanResponder, Dimensions, View } from 'react-native'
import Action from './Action';

const HEIGHT = 60
const { width } = Dimensions.get('window')

export default function Item({ item }) {

    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const heightAnimated = useRef(new Animated.Value(HEIGHT)).current
    const borderWidthAnimated = useRef(new Animated.Value(1)).current
    const actionWidthAnimated = pan.x.interpolate({
        inputRange: [-width, 0],
        outputRange: [width, 0]
    })

    const onRemoveAnimated = () => {
        Animated.parallel([
            Animated.spring(pan, {
                toValue: { x: -9999, y: 0 },
                friction: 5,
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
                if (pan.x._value < -width * 0.5) {
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
                {/* <Action pan={pan} /> */}
                <Animated.View
                    style={{
                        width: actionWidthAnimated,
                        backgroundColor: "yellow",
                        justifyContent: "center",
                        alignItems: 'center'
                    }}
                >
                    <Text>123</Text>
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
        backgroundColor: "red",
        zIndex: 0,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center'
    }
})
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
// import { Animated } from 'react-native-reanimated';

export default function Card({ order, onSwipe }) {

    // const {gestureHandler} = usePanGestureHandler()
    // const x = new Animated.Value(0)
    // const translateX = new Animated.Value(0)
    // const onGestureEvent = Animated.event([
    //     {nativeEvent: {translateX}},
    // ], {useNativeDriver: true})

    const translateY = -order * 20
    const scale = 1 - order * 0.05
    const opacity = 1 - order * 0.25

    const pan = useRef(new Animated.ValueXY({x: 0, y: translateY})).current

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y}
                ],
                // {useNativeDriver: false}
            ),
            onPanResponderRelease: (e, gesture) => {
                if(gesture.dx > 150){
                    Animated.spring(pan, {
                        toValue: {x: 500, y: translateY},
                        friction: 5,
                        useNativeDriver: false
                    }).start(() => onSwipe())
                }
                else{
                    Animated.spring(pan, {
                        toValue: {x: 0, y: 0},
                        friction: 5,
                        useNativeDriver: false
                    }).start()
                }
            }
        })
    ).current

    return (
        // <PanGestureHandler onGestureEvent={onGestureEvent}>
        //     <Animated.View style={[styles.card, {
        //         opacity: 1 - order * 0.3,
        //         transform: [
        //             {translateX},
        //             { translateY: -order * 20 },
        //             { scale: 1 - order * 0.05 },
        //         ]
        //     }]}>
        //     </Animated.View>
        // </PanGestureHandler>
        <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, {
            opacity,
            transform: [
                {translateX: pan.x},
                { translateY: pan.y},
                { scale},
            ]
        }]}>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#74bcb8",
        borderRadius: 20,
    }
})

import React, { useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Transition, Transitioning} from 'react-native-reanimated'

export const colors = {
    home: {
        activeColor: "#3c5898",
        inactiveColor: '#666',
        bgColor: "#d0e0f7"
    },
    weather: {
        activeColor: "#e8892a",
        inactiveColor: '#666',
        bgColor: "#fae6d2"
    },
    schedule: {
        activeColor: "#0c7513",
        inactiveColor: '#666',
        bgColor: "#daf5dc"
    },
    alarm: {
        activeColor: "#e63e0b",
        inactiveColor: '#666',
        bgColor: "#fad2c5"
    },
}

export default function TabbarIcon({ icon, label, size, onPress, ...props }) {
    const { accessibilityState } = props
    const { activeColor, inactiveColor, bgColor } = colors[label.toLowerCase()]

    const isFocused = accessibilityState.selected
    const colorStyle = isFocused ? activeColor : inactiveColor
    const bgColorStyle = isFocused ? bgColor : "transparent"

    const transition = (
        <Transition.Sequence>
            <Transition.Out type="fade" durationMs={0}/>
            <Transition.Change interpolation="easeInOut" durationMs={100}/>
            <Transition.In type="fade" durationMs={10} />
        </Transition.Sequence>
    )

    const ref = useRef()

    return (
        <TouchableOpacity
            onPress={() => {
                ref.current.animateNextTransition()
                onPress()
            }}
            style={[styles.tabButton, { backgroundColor: bgColorStyle }]}
            activeOpacity={1}
        >
            <Transitioning.View
            style={{ flexDirection: "row" }} 
            ref={ref}
            transition={transition}
            >
                <Icon name={icon} size={size} color={colorStyle} />
                {
                    isFocused && <Text style={{ color: colorStyle, marginLeft: 5 }}>
                        {label}
                    </Text>
                }
            </Transitioning.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        borderRadius: 10,
    },
})

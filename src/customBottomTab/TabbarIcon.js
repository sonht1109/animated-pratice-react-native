import React, { useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native';
import { Transition, Transitioning } from 'react-native-reanimated'

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
            <Transition.Out type="fade" durationMs={0} />
            <Transition.Change interpolation="easeInOut" durationMs={200} />
            <Transition.In type="fade" durationMs={100} />
        </Transition.Sequence>
    )

    const ref = useRef()

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                ref.current.animateNextTransition()
                onPress()
            }}
        >
            <Transitioning.View
                style={[styles.tabButton, { backgroundColor: bgColorStyle}]}
                ref={ref}
                transition={transition}
                isFocused={isFocused}
                label={label}
            >
                <Icon name={icon} size={size} color={colorStyle} />
                <View style={{overflow: "visible"}}>
                    {
                        isFocused &&
                        <Text style={{ color: colorStyle, marginLeft: 5 }}>
                            {label}
                        </Text>
                    }
                </View>
            </Transitioning.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        borderRadius: 10,
    },
})

// const InnerButton = styled(Transitioning.View)`
//     /* flex: auto; */
//     flex-grow: 1;
//     align-items: center;
//     justify-content: center;
//     margin: 6px;
//     border-radius: 10px;
//     flex-direction: row;
//     background-color: ${(props) => (props.isFocused ? colors[props.label.toLowerCase()].bgColor : "white")};
// `
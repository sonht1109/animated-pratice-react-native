import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View} from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export default function ProgressBar() {

    const progress = new Animated.Value(0)

    // const [value, setValue] = useState(0)

    useEffect(() => {
        progress.setValue(0)
        // progress.addListener(progress => setValue(parseInt(progress.value)))
        Animated.timing(progress, {
            toValue: 100,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }, [])

    return (
        <View style={{ justifyContent: 'center' }}>
            {/* <Text>{value} %</Text> */}
            <View style={styles.bar}>
                <Animated.View style={{
                    width: progress.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [0, (width - 50)/2, width - 50]
                    }),
                    position: 'absolute',
                    left: 0,
                    height: 14,
                    backgroundColor: 'rgb(199, 45, 50)',
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        borderColor: "black",
        borderWidth: 1,
        width: width - 50,
        height: 16,
    }
})

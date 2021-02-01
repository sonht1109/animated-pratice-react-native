import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScaleButton from './ScaleButton'
import StatefulButton from './StatefulButton'

export default function CustomButton() {
    return (
        <View style={styles.container}>
            <ScaleButton />
            <StatefulButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

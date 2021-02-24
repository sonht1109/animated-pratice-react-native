import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

const {height} = Dimensions.get('window')
const MIN_HEIGHT = 128
const MAX_HEIGHT = height/2

export default function Row({image, title, subtitle}) {
    return (
        <View style={{height: MAX_HEIGHT, justifyContent: "flex-end"}}>
            <View style={{...StyleSheet.absoluteFillObject}}>
                <Image source={image} style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                    resizeMode: 'cover'
                }}/>
                <View style={styles.overlay} />
            </View>
            <View style={{marginVertical: 20}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        textTransform: "uppercase",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 2
    },
    subtitle: {
        textAlign: 'center',
        textTransform: "uppercase",
        color: "white",
        fontSize: 36,
        fontWeight: "bold",
        letterSpacing: 5
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
})
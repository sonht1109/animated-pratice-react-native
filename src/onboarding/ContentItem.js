import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window')

const isLastColor = '#2cb9b0'
const normalColor = '#e8e8e8'

export default function ContentItem({ title, content, isLast, onPressToScroll }) {
    return (
        <View style={styles.contentWrapper}>
            <View style={styles.innerContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressToScroll}
                style={[styles.button, {
                    backgroundColor: isLast ? isLastColor : normalColor
                }]}>
                <Text style={{ color: isLast ? 'white' : "black", textAlign: 'center',paddingVertical: 12, fontWeight: 'bold' }}>
                    {isLast ? 'Getting started' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    contentWrapper: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    innerContent: {
        marginBottom: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: "capitalize"
    },
    content: {
        color: "#666",
        textAlign: 'center',
        marginVertical: 10,
        lineHeight: 20,
        marginHorizontal: 30
    },
    button: {
        marginHorizontal: 30,
        borderRadius: 20
    }
})

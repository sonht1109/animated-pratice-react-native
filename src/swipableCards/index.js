import React, { useState } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { useRef } from 'react/cjs/react.development';
import Card from './Card';

const cards = [
    { order: 3 },
    { order: 2 },
    { order: 1 },
    { order: 0 },
]

export default function SwipableCards() {

    const [currentIndex, setCurrentIndex] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.cardWrapper}>
                {cards.map((card) => {
                    return (
                        <Card
                        onSwipe={() => {
                            console.log(('swiped'));
                        }}
                        order={card.order}
                        key={card.order} />
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cardWrapper: {
        position: "relative",
        height: 350,
        width: 250
    }
})

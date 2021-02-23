import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import slides from './slides'
import SlideItem from './SlideItem';

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <View style={styles.slides}>
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                >
                    {slides.map((slide, index) => {
                        const {label, bgColor} = slide
                        return <SlideItem label={label} bgColor={bgColor} key={'slide' + index} isRight={index % 2} />
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

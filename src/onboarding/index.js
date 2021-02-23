import React, { useEffect } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import slides from './slides'
import SlideItem from './SlideItem';

const {width, height} = Dimensions.get('window')

export default function Onboarding() {

    const scrollAnimated = new Animated.Value(0)

    const bgStyle = scrollAnimated.interpolate({
        inputRange: slides.map((_, i) => i*width),
        outputRange: slides.map(slide => slide.bgColor)
    })

    return (
        <View style={styles.container}>
            <View style={styles.slides}>
                <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollAnimated}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={1}
                >
                    {slides.map((slide, index) => {
                        const {label, bgColor} = slide
                        return <SlideItem label={label} bgColor={bgStyle} key={'slide' + index} isRight={index % 2} />
                    })}
                </Animated.ScrollView>
            </View>
            <Animated.View style={{flex: 1, backgroundColor: bgStyle}}>
                <View style={styles.content}></View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    slides: {
        borderBottomRightRadius: 75,
        overflow: "hidden"
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 75,
        backgroundColor: "white"
    },
})

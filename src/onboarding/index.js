import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import slides from './slides'
import SlideItem from './SlideItem';
import ContentItem from './ContentItem';

const { width } = Dimensions.get('window')

export default function Onboarding() {

    const scrollAnimated = new Animated.Value(0)
    const scrollViewRef = useRef(null)

    const bgStyle = scrollAnimated.interpolate({
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(slide => slide.bgColor)
    })
    
    const onPressToScroll = (isLast, index) => {
        if(!isLast){
            scrollViewRef.current.scrollTo({
                x: width*(index + 1),
                y: 0,
                useNativeDriver: true
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.slides}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollAnimated } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                >
                    {slides.map((slide, index) => {
                        const { label } = slide
                        return (
                            <SlideItem
                            label={label}
                            bgColor={bgStyle}
                            key={'slide' + index}
                            isRight={index % 2}
                            />
                        )
                    })}
                </Animated.ScrollView>
            </View>
            <Animated.View style={{ flex: 1, backgroundColor: bgStyle }}>
                <Animated.View style={[styles.contents, {
                    transform: [
                        { translateX: Animated.multiply(-1, scrollAnimated) }
                    ]
                }]}>
                    {
                        slides.map(({ title, content }, index) => {
                            const isLast = index === slides.length - 1
                            return (
                                <ContentItem
                                    title={title}
                                    content={content}
                                    isLast={isLast}
                                    key={'content' + index}
                                    onPressToScroll={() => onPressToScroll(isLast, index)}
                                />
                            )
                        })
                    }
                </Animated.View>
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
    contents: {
        flex: 1,
        width: width * slides.length,
        borderTopLeftRadius: 75,
        backgroundColor: "white",
        flexDirection: 'row'
    },
})

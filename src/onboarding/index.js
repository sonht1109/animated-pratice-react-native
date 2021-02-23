import React, { useRef } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import slides from './slides'
import SlideItem from './SlideItem';
import ContentItem from './ContentItem';
import Dot from './Dot';

const { width } = Dimensions.get('window')
const activeColor = "#2cb9b0"
const inactiveColor = "#e8e8e8"

export default function Onboarding() {

  const scrollAnimated = new Animated.Value(0)
  const scrollViewRef = useRef(null)

  const bgStyle = scrollAnimated.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map(slide => slide.bgColor)
  })

  const onPressToScroll = (isLast, index) => {
    if (!isLast) {
      scrollViewRef.current.scrollTo({
        x: width * (index + 1),
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
        <Animated.View style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius: 75, overflow: 'hidden', position: "relative" }}>
          {/* paging */}
          <View style={styles.paging}>
            {
              slides.map((_, i) => {
                const inputRange = [(i-1)* width, i*width, (i+1)*width]
                const dotColorStyle = scrollAnimated.interpolate({
                  inputRange,
                  outputRange: [inactiveColor, activeColor, inactiveColor],
                  extrapolate: 'clamp'
                })
                const scaleStyle = scrollAnimated.interpolate({
                  inputRange,
                  outputRange: [1, 1.2, 1],
                  extrapolate: "clamp"
                })
                return (
                  <Dot key={"dot" + i} color={dotColorStyle} scaleStyle={scaleStyle} />
                )
              })
            }
          </View>
          {/* slides */}
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
  paging: {
    // position: "absolute",
    // top: 0,
    width: width,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // zIndex: 10
  }
})

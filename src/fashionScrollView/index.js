import React from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import list from './list'
import Row from './Row';

const {height} = Dimensions.get('window')
const MAX_HEIGHT = height/2

export default function FashionScrollView() {

    const y = new Animated.Value(0)
    return (
        <Animated.ScrollView
        // scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={MAX_HEIGHT}
        contentContainerStyle={{height: MAX_HEIGHT*(list.length + 1), backgroundColor: "black"}}

        onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: y}}}], 
            {useNativeDriver: false}
        )}
        >
            {
                list.map(({image, title, subtitle, id}, index) => {
                    return(
                        <Row y={y} key={'fashion'+id} image={image} title={title} subtitle={subtitle} index={index} /> 
                    )
                })
            }
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({})

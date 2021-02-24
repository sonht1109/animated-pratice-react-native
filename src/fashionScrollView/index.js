import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated';
import list from './list'
import Row from './Row';

export default function FashionScrollView() {
    return (
        <Animated.ScrollView>
            {
                list.map(({image, title, subtitle, id}) => {
                    return(
                        <Row key={'fashion'+id} image={image} title={title} subtitle={subtitle} /> 
                    )
                })
            }
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({})

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from './TabbarIcon';

export default function Weather() {
    return (
        <View style={{flex: 1, backgroundColor: colors['weather'].bgColor}} />
    )
}
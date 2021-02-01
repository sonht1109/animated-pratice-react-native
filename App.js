import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CollapsibleElement from './src/collapsibleElement/index';
import CustomButton from './src/customButton';

export default function App() {
  return (
    <View style={{flex: 1}}>
      {/* <CollapsibleElement /> */}
      <CustomButton />
    </View>
  )
}

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CollapsibleElement from './src/collapsibleElement/index';
import CustomButton from './src/customButton';
import ExpandPage from './src/expandPage';
import Locations from './src/locations';
import UserLocation from './src/userLocation/index';
import CustomBottomTab from './src/customBottomTab/index';
import CustomBottomTab2 from './src/customBottomTab/CustomBottomTab2';
import Onboarding from './src/onboarding/index';
import SwipableCards from './src/swipableCards/index';
import FashionScrollView from './src/fashionScrollView/index';
import SwipeToDeleteList from './src/swipeToDeleteList';

export default function App() {
  return (
    <View style={{flex: 1}}>
      {/* <CollapsibleElement /> */}
      {/* <CustomButton /> */}
      {/* <ExpandPage /> */}
      {/* <UserLocation/> */}
      {/* <Locations/> */}
      {/* <CustomBottomTab /> */}
      {/* <CustomBottomTab2/> */}
      {/* <Onboarding /> */}
      {/* <SwipableCards /> */}
      {/* <FashionScrollView /> */}
      <SwipeToDeleteList />
    </View>
  )
}

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Weather from './Weather';
import Home from './Home';
import Schedule from './Schedule';
import Alarm from './Alarm';

export default function CustomBottomTab() {

    const Tab = createBottomTabNavigator()
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                component={Home}
                name="Home"
                />
                <Tab.Screen
                component={Weather}
                name="Weather"
                />
                <Tab.Screen
                component={Schedule}
                name="Schedule"
                />
                <Tab.Screen
                component={Alarm}
                name="Alarm"
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

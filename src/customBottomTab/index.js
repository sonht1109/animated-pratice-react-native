import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Weather from './Weather';
import Home from './Home';
import Schedule from './Schedule';
import Alarm from './Alarm';
import TabbarIcon from './TabbarIcon';

export default function CustomBottomTab() {

    const Tab = createBottomTabNavigator()
    
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                component={Home}
                name="Home"
                options={{
                    tabBarButton: props => <TabbarIcon
                    icon="home-outline"
                    label="Home"
                    size={20}
                    {...props} />
                }}
                />
                <Tab.Screen
                component={Weather}
                name="Weather"
                options={{
                    tabBarButton: props => <TabbarIcon
                    icon="rainy-outline"
                    size={20}
                    label="Weather"
                    {...props} />
                }}
                />
                <Tab.Screen
                component={Schedule}
                name="Schedule"
                options={{
                    tabBarButton: props => <TabbarIcon
                    icon="calendar-outline"
                    size={20}
                    label="Schedule"
                    {...props} />
                }}
                />
                <Tab.Screen
                component={Alarm}
                name="Alarm"
                options={{
                    tabBarButton: props => <TabbarIcon
                    icon="alarm-outline" 
                    size={20}
                    label="Alarm"
                    {...props} />
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

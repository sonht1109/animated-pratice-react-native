import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Schedule from './Schedule';
import Weather from './Weather';
import Alarm from './Alarm';
import Icon from 'react-native-vector-icons/Ionicons'
import AddButton from './AddButton';

const AddButtonScreen = () => {
    return null
}

export default function CustomBottomTab2() {

    const Tab = createBottomTabNavigator()

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="home-outline" size={25} color={color} />
                    }}
                />
                <Tab.Screen
                    name='Weather'
                    component={Weather}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="rainy-outline" size={25} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={AddButtonScreen}
                    options={{
                        tabBarIcon: () => <AddButton />,
                        title: ''
                    }}
                />
                <Tab.Screen
                    name='Schedule'
                    component={Schedule}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="calendar-outline" size={25} color={color} />
                    }}
                />
                <Tab.Screen
                    name='Alarm'
                    component={Alarm}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="alarm-outline" size={25} color={color} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

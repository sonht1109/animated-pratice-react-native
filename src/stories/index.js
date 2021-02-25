import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StoriesScreen from './StoriesScreen';
import Story from './Story';

export default function Stories() {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen
                component={StoriesScreen}
                name="StoriesScreen"
                />
                <Stack.Screen
                component={Story}
                name="Story"
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

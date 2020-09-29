import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Decks from '../components/Decks'
import NewDeck from '../components/NewDeck'

const AndroidTabs = createMaterialTopTabNavigator()
const IOSTabs = createBottomTabNavigator()

export default function Tabs() {
    return (
        Platform.OS === 'ios' ?
        <IOSTabs.Navigator>
            <IOSTabs.Screen
                name="Decks"
                component={ Decks } />
            <IOSTabs.Screen
                name="New Deck"
                component={ NewDeck } />
        </IOSTabs.Navigator>
        :
        <AndroidTabs.Navigator>
            <AndroidTabs.Screen
                name="Decks"
                component={ Decks } />
            <AndroidTabs.Screen
                name="New Deck"
                component={ NewDeck } />
        </AndroidTabs.Navigator>
    )
}

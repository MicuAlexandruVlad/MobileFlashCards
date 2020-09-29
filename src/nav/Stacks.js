import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Decks from '../components/Decks'
import IndividualDeck from '../components/IndividualDeck'
import Quiz from '../components/Quiz'
import NewQuestion from '../components/NewQuestion'
import Tabs from '../nav/Tabs'

const Stack = createStackNavigator();

export default function Stacks() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Decks"
                component={ Tabs }
                options={{
                    animationEnabled: true,
                    headerShown: false
                }} />
            <Stack.Screen 
                name="IndividualDeck"
                component={ IndividualDeck }
                options={{
                    animationEnabled: true,
                    headerShown: false
                }} />
            <Stack.Screen 
                name="Quiz"
                component={ Quiz }
                options={{
                    animationEnabled: true,
                    headerShown: false
                }} />
            <Stack.Screen 
                name="NewQuestion"
                component={ NewQuestion }
                options={{
                    animationEnabled: true,
                    headerShown: false
                }} />     
        </Stack.Navigator>
    )
}
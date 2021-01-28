import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import Constants from 'expo-constants'
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DeckList} />
      <Tab.Screen name="New Deck" component={NewDeck} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="DeckView" component={DeckView} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Add Card" component={NewCard} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View
        style={{ height: Constants.statusBarHeight }}>
        <StatusBar style="auto" />
      </View>
      <StackNavigator />
    </NavigationContainer>
  );
}
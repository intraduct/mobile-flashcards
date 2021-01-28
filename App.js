import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import DeckView from './components/DeckView';
import DeckList from './components/DeckList';
import Constants from 'expo-constants'
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View
        style={{ height: Constants.statusBarHeight }}>
        <StatusBar style="auto" />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={DeckList} />
        <Tab.Screen name="New Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
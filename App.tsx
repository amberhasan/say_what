import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import CaptionsScreen from './src/screens/CaptionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';

const Tab = createBottomTabNavigator();
const DiscoverStack = createStackNavigator();

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator initialRouteName="DiscoverScreen">
      <DiscoverStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{title: 'Discover'}} // This will set the title in the header
      />
      <DiscoverStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{title: 'Location'}} // This will set the title in the header
      />
      <DiscoverStack.Screen
        name="CaptionsScreen"
        component={CaptionsScreen}
        options={{title: 'Mountain'}} // This will set the title in the header
      />
    </DiscoverStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverStackNavigator} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import CaptionsScreen from './src/screens/CaptionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';

const Tab = createBottomTabNavigator();
const DiscoverStack = createStackNavigator();
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? require('./src/images/location/mountains.png') // active icon
                  : require('./src/images/location/mountains.png'); // inactive icon
              } else if (route.name === 'Discover') {
                iconName = focused
                  ? require('./src/images/location/mountains.png')
                  : require('./src/images/location/mountains.png');
              }
              // ... other icons for Favorites and Search
              return (
                <Image source={iconName} style={{width: size, height: size}} />
              );
            },
            tabBarLabel: ({focused, color}) => {
              return (
                <Text style={{color: focused ? 'blue' : 'black'}}>
                  {' '}
                  // Adjust color and style
                  {route.name}
                </Text>
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue', // Adjust active tint color
            inactiveTintColor: 'gray', // Adjust inactive tint color
            style: {
              // Add custom styles here
            },
            labelStyle: {
              // Add custom label styles here
            },
            showLabel: true, // Set this to false if you don't want to show labels
          }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Discover" component={DiscoverStackNavigator} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator
      initialRouteName="DiscoverScreen"
      screenOptions={{headerShown: false}} // This will hide the header for all screens in the Discover stack
    >
      <DiscoverStack.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <DiscoverStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
      />
      <DiscoverStack.Screen name="CaptionsScreen" component={CaptionsScreen} />
    </DiscoverStack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

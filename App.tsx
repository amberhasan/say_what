import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SubcategoriesScreen from './src/screens/SubcategoriesScreen';
import CaptionsScreen from './src/screens/CaptionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import {DiscoverStackParams, SearchStackParams} from './src/types';

const Tab = createBottomTabNavigator();
const DiscoverStack = createStackNavigator<DiscoverStackParams>();
const SearchStack = createStackNavigator<SearchStackParams>();
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', marginTop: 75}}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarStyle: {
                shadowOpacity: 0,
                backgroundColor: 'white',
                borderTopWidth: 0,
                paddingHorizontal: 25,
              },
              headerShown: false,
              tabBarShowLabel: false, // This tells the tab navigator not to show the label
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? require('./src/assets/images/bottom/selected/house_pink.png') // active icon
                    : require('./src/assets/images/bottom/unselected/house.png'); // inactive icon
                } else if (route.name === 'Discover') {
                  iconName = focused
                    ? require('./src/assets/images/bottom/selected/lightbulb_pink.png') // active icon
                    : require('./src/assets/images/bottom/unselected/lightbulb.png'); // inactive icon
                } else if (route.name === 'Favorites') {
                  iconName = focused
                    ? require('./src/assets/images/bottom/selected/heart_pink.png') // active icon
                    : require('./src/assets/images/bottom/unselected/heart.png'); // inactive icon
                } else if (route.name === 'Search') {
                  iconName = focused
                    ? require('./src/assets/images/bottom/selected/glass_pink.png') // active icon
                    : require('./src/assets/images/bottom/unselected/glass.png'); // inactive icon
                }
                return (
                  <Image source={iconName} style={{width: 60, height: 60}} />
                );
              },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Discover" component={DiscoverStackNavigator} />
            <Tab.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{unmountOnBlur: true}}
            />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator
      initialRouteName="CategoriesScreen"
      screenOptions={{headerShown: false}} // This will hide the header for all screens in the Discover stack
    >
      <DiscoverStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
      <DiscoverStack.Screen
        name="SubcategoriesScreen"
        component={SubcategoriesScreen}
        options={{headerShown: false}}
      />
      <DiscoverStack.Screen
        name="CaptionsScreen"
        component={CaptionsScreen}
        options={{headerShown: false}}
      />
    </DiscoverStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{headerShown: false}} // This will hide the header for all screens in the Discover stack
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <SearchStack.Screen
        name="CaptionsScreen"
        component={CaptionsScreen}
        options={{headerShown: false}}
      />
    </SearchStack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

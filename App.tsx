import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SubcategoriesScreen from './src/screens/SubcategoriesScreen';
import CaptionsScreen from './src/screens/CaptionsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';
import {Provider, useDispatch} from 'react-redux';
import configureStore from './src/store/configureStore';
import {
  DiscoverStackParams,
  OverviewStackParams,
  SearchStackParams,
} from './src/types';
import {getUniqueId} from 'react-native-device-info';
import {setDeviceId} from './src/actions/appActions';
import OverviewScreen from './src/screens/OverviewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './src/theme/colors';

const Tab = createBottomTabNavigator();
const DiscoverStack = createStackNavigator<DiscoverStackParams>();
const SearchStack = createStackNavigator<SearchStackParams>();
const OverviewStack = createStackNavigator<OverviewStackParams>();
const store = configureStore();

export default function App() {
  const [showOverviewScreen, setShowOverviewScreen] = useState<null | boolean>(
    null,
  );

  const getOverviewScreenValue = async () => {
    try {
      // await AsyncStorage.clear();
      console.log('Calling the function');
      const result = await AsyncStorage.getItem('SHOW_GETTING_STARTED_SCREEN'); //'true'
      console.log('result ', result);
      if (result) {
        const bool = result === 'true';
        setShowOverviewScreen(bool);
      } else {
        setShowOverviewScreen(true);
      }
    } catch (err) {
      console.error('Error getting value from storage ', err);
    }
  };

  useEffect(() => {
    getOverviewScreenValue();
    getUniqueId()
      .then(id => {
        store.dispatch(setDeviceId(id.split('-').join('')));
        console.log('id', id);
      })
      .catch(err => console.log('unable to get device id ', err));
  }, []);

  if (showOverviewScreen === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: showOverviewScreen ? colors.lightPink : colors.white,
        }}>
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1}}>
          <NavigationContainer>
            {showOverviewScreen ? (
              <OverviewScreenNavigator
                initialRouteParams={{
                  getOverviewScreenValue,
                }}
              />
            ) : (
              <Tab.Navigator
                screenOptions={({route}) => ({
                  tabBarStyle: {
                    shadowOpacity: 0,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0,0,0,0.5)',
                    paddingTop: 28,
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
                      <Image
                        source={iconName}
                        style={{width: 52, height: 52}}
                      />
                    );
                  },
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen
                  name="Discover"
                  component={DiscoverStackNavigator}
                />
                <Tab.Screen
                  name="Favorites"
                  component={FavoritesScreen}
                  options={{unmountOnBlur: true}}
                />
                <Tab.Screen name="Search" component={SearchStackNavigator} />
              </Tab.Navigator>
            )}
          </NavigationContainer>
        </View>
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

function OverviewScreenNavigator({initialRouteParams}) {
  return (
    <OverviewStack.Navigator>
      <OverviewStack.Screen
        name="OverviewScreen"
        options={{headerShown: false}}>
        {props => (
          <OverviewScreen
            {...props}
            onRefresh={initialRouteParams.getOverviewScreenValue}
          />
        )}
      </OverviewStack.Screen>
    </OverviewStack.Navigator>
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

import React, {useEffect, useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationContainer,
  Route,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
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
  HomeStackParams,
  OverviewStackParams,
  SearchStackParams,
} from './src/types';
import {getUniqueId} from 'react-native-device-info';
import {setDeviceId} from './src/actions/appActions';
import OverviewScreen from './src/screens/OverviewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './src/theme/colors';
import InfoScreen from './src/screens/InfoScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeStackParams>();
const DiscoverStack = createStackNavigator<DiscoverStackParams>();
const SearchStack = createStackNavigator<SearchStackParams>();
const OverviewStack = createStackNavigator<OverviewStackParams>();
const store = configureStore();

export default function App() {
  const navigationRef = createRef();
  const routeNameRef = createRef();

  const [showOverviewScreen, setShowOverviewScreen] = useState<null | boolean>(
    null,
  );
  const [currentRouteName, setCurrentRouteName] = useState<string>('');

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

  const getTabBarVisibility = (route): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log('routeName', routeName);
    const hideOnScreens = ['InfoScreen']; // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName) <= -1;
  };

  const getStatusBarColor = () => {
    if (showOverviewScreen || currentRouteName === 'InfoScreen') {
      return colors.lightPink;
    } else {
      return colors.white;
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: getStatusBarColor(),
        }}>
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1}}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              setCurrentRouteName(navigationRef.current.getCurrentRoute().name);
            }}
            onStateChange={() => {
              // const previousRouteName = routeNameRef.current;
              const currentRouteName =
                navigationRef.current.getCurrentRoute().name;
              console.log('currentRouteName', currentRouteName);
              setCurrentRouteName(currentRouteName);
            }}>
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
                    paddingHorizontal: 0,
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
                <Tab.Screen
                  name="Home"
                  component={HomeStackNavigator}
                  options={({route}) => {
                    const result = getTabBarVisibility(route);
                    return result
                      ? {
                          tabBarStyle: {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            shadowOpacity: 0,
                            backgroundColor: 'white',
                            borderTopWidth: 1,
                            borderTopColor: 'rgba(0,0,0,0.5)',
                            paddingTop: 28,
                            paddingHorizontal: 0,
                          },
                        }
                      : {
                          tabBarStyle: {display: 'none'},
                        };
                  }}
                />
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

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}} // This will hide the header for all screens in the Discover stack
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Overview from '../components/Overview';

const OverviewScreen = ({onRefresh}: any) => {
  const onPressLetsGo = async () => {
    try {
      await AsyncStorage.setItem('SHOW_GETTING_STARTED_SCREEN', 'false');
      onRefresh();
    } catch (err) {
      console.error('Error occurred on lets go', err);
    }
  };

  return <Overview onPressLetsGo={onPressLetsGo} />;
};

export default OverviewScreen;

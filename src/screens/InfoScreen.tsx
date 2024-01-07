import {useLayoutEffect} from 'react';
import Overview from '../components/Overview';
import {View, TouchableOpacity, Image} from 'react-native';
import colors from '../theme/colors';

const InfoScreen = ({navigation}: any) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {display: 'none', shown: false},
    });
  }, [navigation]);

  const onPressLetsGo = () => {
    navigation.pop();
  };
  return (
    <View
      style={{
        backgroundColor: colors.lightPink,
        height: '100%',
        width: '100%',
      }}>
      <TouchableOpacity
        style={{position: 'absolute', zIndex: 1000, right: 20}}
        onPress={onPressLetsGo}>
        <Image
          source={require('../assets/images/utils/x.png')}
          style={{height: 32, width: 32}}
        />
      </TouchableOpacity>
      <Overview onPressLetsGo={onPressLetsGo} />
    </View>
  );
};

export default InfoScreen;

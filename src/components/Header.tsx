import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Header = ({title}) => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.pop();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{width: 50, flex: 0}} onPress={onBackPress}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/utils/back.png')}
          style={{
            height: 50,
            width: 50,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{flex: 0, width: 50}}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 20,
  },
});
export default Header;

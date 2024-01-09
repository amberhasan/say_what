import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import colors from '../theme/colors';

const HomeScreen: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 30,
        }}
        onPress={() => {
          navigation.navigate('InfoScreen');
        }}>
        <Image
          source={require('../assets/images/utils/info_icon.png')}
          style={{
            height: 32,
            width: 32,
          }}
        />
      </TouchableOpacity>
      <Header
        title={'Capfluencer'}
        showBackButton={false}
        style={{fontSize: 45, fontFamily: 'YesevaOne-Regular'}}
      />
      <View
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 100,
          paddingBottom: 130,
        }}>
        <View style={styles.outerBox}>
          <View style={styles.innerBox}>
            <Text style={styles.caption}>Trendy,</Text>
            <Text style={styles.caption}>relatable,</Text>
            <Text style={styles.caption}>& relevant captions!</Text>
          </View>
          <Text style={styles.subtitle}>Browse, save and search now!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },
  title: {
    fontFamily: 'YesevaOne-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
    marginTop: 20, // Add some margin at the top to push it down a bit
  },
  subtitle: {
    fontFamily: 'YesevaOne-Regular',
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  outerBox: {
    flex: 0, // Take up remaining space
    justifyContent: 'center', // Center the captions vertically
    padding: 20,
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: colors.white,
  },

  innerBox: {
    backgroundColor: colors.lightPink,
    paddingTop: 50,
    paddingBottom: 50,
  },
  caption: {
    fontFamily: 'YesevaOne-Regular',
    fontSize: 50,
    textAlign: 'center',
  },
});

export default HomeScreen;

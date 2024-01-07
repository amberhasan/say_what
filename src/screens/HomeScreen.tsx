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

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 30,
        }}
        onPress={() => {
          Alert.alert('Info clicked');
        }}>
        <Image
          source={require('../assets/images/utils/info_icon.png')}
          style={{
            height: 32,
            width: 32,
          }}
        />
      </TouchableOpacity>
      <Header title={'Capfluencer'} showBackButton={false} />
      <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
        <View>
          <Text style={styles.subtitle}>Caption - Influencer</Text>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>trendy,</Text>
          <Text style={styles.caption}>relatable,</Text>
          <Text style={styles.caption}>& relevant captions!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginBottom: 40,
    marginTop: 10,
  },
  captionContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center the captions vertically
    alignItems: 'flex-start', // Align the captions to the left
    paddingLeft: 50,
  },
  caption: {
    fontFamily: 'YesevaOne-Regular',
    fontSize: 55,
    textAlign: 'left',
  },
  footer: {
    fontFamily: 'Sanchez-Regular',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    paddingTop: 10, // Add some padding at the top
    marginBottom: 40, // Add some margin at the bottom
  },
});

export default HomeScreen;

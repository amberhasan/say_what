import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const GettingStarted = ({onRefresh}) => {
  const onPressLetsGo = async () => {
    try {
      await AsyncStorage.setItem('SHOW_GETTING_STARTED_SCREEN', 'false');
      onRefresh();
    } catch (err) {
      console.error('Error occurred on lets go', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to...</Text>

      <Text style={styles.captionText}>Your new Caption Influencer!</Text>
      <View style={{height: 350, marginHorizontal: 20}}>
        <ImageBackground
          resizeMode="stretch"
          style={{
            height: 350,
            width: '100%',
          }}
          source={require('../assets/images/utils/messageCloudPlaceholder.png')}>
          <View
            style={{
              height: 265,
              // backgroundColor: 'orange',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              paddingHorizontal: 15,
              // marginHorizontal: 75,,
              // opacity: 0.5,
            }}>
            <Text style={styles.descriptionText}>
              Whether you’re in a pinch, need inspiration, or have no idea what
              to do, Capfluencer is here to help!
            </Text>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressLetsGo}>
        <Text style={styles.buttonText}>Let's go!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8e1f4',
  },
  welcomeText: {
    fontSize: 60,
    padding: 5,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Ephesis-Regular',
  },
  captionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: 'YesevaOne-Regular',
  },
  button: {
    backgroundColor: '#FFFFFF', // Set to white or the color matching your design
    paddingVertical: 10,
    paddingHorizontal: 40, // Increase padding for a wider button
    borderRadius: 10, // Adjust border radius to match your design, if it's a circle, it should be half of the height
    borderWidth: 1, // Add border width if there is a border in the design
    borderColor: '#000000', // Set border color to match your design
    // Add shadow styles if the button has a shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold', // Add bold if the text is bold in the design
    color: '#000000', // Set text color to match your design
    textAlign: 'center',
  },
});

export default GettingStarted;

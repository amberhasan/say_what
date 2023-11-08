// CategoryButton.js
import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import CustomText from './CustomText';

const GrayButton = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
      <ImageBackground
        source={require('../assets/images/functional/gray_button.png')}
        style={styles.buttonImage}
        resizeMode="cover" // or "stretch" to fill the button area
      >
        <CustomText style={styles.buttonText}>{item}</CustomText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden', // This is to ensure the borderRadius is applied to the image as well
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
  },
});

export default GrayButton;

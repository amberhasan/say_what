// CategoryButton.js
import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import CustomText from './CustomText';
import {GrayButtonProps} from '../types';

const GrayButton = ({
  item,
  onPress,
  buttonText,
  buttonContainer,
  buttonImageContainer,
}: GrayButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonContainer]}
      onPress={() => onPress(item)}>
      <ImageBackground
        source={require('../assets/images/functional/gray_button.png')}
        style={[styles.buttonImage, buttonImageContainer]}
        resizeMode="contain" // or "stretch" to fill the button area
      >
        <CustomText style={[styles.buttonText, buttonText]}>{item}</CustomText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 60,
    borderRadius: 15,
    marginBottom: 10, // Reduced from 20 to 10 for less space
    overflow: 'hidden',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 25.4,
    // fontWeight: '700',
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

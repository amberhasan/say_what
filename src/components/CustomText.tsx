import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PlayfairDisplay-Regular', // Replace with your actual font family
    // ... any other default styles you want
  },
});

const CustomText = ({style, ...props}) => {
  return <RNText style={[styles.text, style]} {...props} />;
};

export default CustomText;

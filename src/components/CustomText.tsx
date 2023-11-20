import React from 'react';
import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';
import {customTextProps} from '../types';

const CustomText = ({style, ...props}: customTextProps) => {
  return <RNText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PlayfairDisplay-Regular', // Replace with your actual font family
    // ... any other default styles you want
  },
});

export default CustomText;

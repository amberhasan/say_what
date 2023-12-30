import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CategoryBoxProps} from '../types';

// Assuming category.icon is of type ImageSourcePropType which is the correct type for an image source
const CategoryBox = ({category, onPress}: CategoryBoxProps) => (
  <View
    style={{
      width: '38%', // 4 boxes per row
      marginHorizontal: 10,
    }}>
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.container}>
        <FastImage
          source={{uri: category.icon}}
          style={styles.icon}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </TouchableOpacity>
    <View style={{flex: 0, width: '90%'}}>
      <Text style={styles.label}>{category.label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: '90%', // 4 boxes per row
    aspectRatio: 1, // Keep the box aspect ratio to 1:1, adjust if necessary
    borderWidth: 4,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

    // paddingHorizontal: 10, // Adjust padding to ensure content fits and is centered
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5, // Adjust horizontal padding if necessary
    paddingVertical: 5, // Adjust vertical padding if necessary
  },
  icon: {
    width: '100%', // Icons should scale to fit the container width
    height: undefined, // Height will be calculated based on the aspect ratio
    aspectRatio: 1, // Adjust if the icons should not be square
    marginBottom: 8,
  },
  label: {
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
    marginTop: -1,
  },
});

export default CategoryBox;

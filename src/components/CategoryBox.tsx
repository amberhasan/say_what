import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Assuming category.icon is of type ImageSourcePropType which is the correct type for an image source
const CategoryBox = ({category, onPress}) => (
  <TouchableOpacity style={styles.box} onPress={onPress}>
    <View style={styles.container}>
      <Image source={category.icon} style={styles.icon} resizeMode="contain" />
    </View>
    <Text style={styles.label}>{category.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    width: '40%', // 4 boxes per row
    aspectRatio: 1, // Keep the box aspect ratio to 1:1, adjust if necessary
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10, // Adjust padding to ensure content fits and is centered
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
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoryBox;

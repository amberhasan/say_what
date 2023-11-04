import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CategoryBox = ({category, onPress}) => (
  <TouchableOpacity style={styles.box} onPress={onPress}>
    <Text style={styles.icon}>{category.icon}</Text>
    <Text style={styles.label}>{category.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    width: '45%', // adjust according to your preference
    height: 120, // adjust according to your preference
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    fontSize: 40, // adjust according to your preference
  },
  label: {
    fontSize: 18, // adjust according to your preference
    marginTop: 10,
  },
});

export default CategoryBox;

// DropdownMenu.js
import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const DropdownMenu = ({
  caption,
  copyToClipboard,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        onPress={() => copyToClipboard(caption)}
        style={styles.dropdownItem}>
        <Image
          source={require('../assets/images/utils/link.png')} // Replace with your 'link' icon
          style={styles.iconStyle}
        />
        <Text style={styles.textItem}>Copy to clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleFavorite(caption)}
        style={styles.dropdownItem}>
        <Image
          source={
            require('../assets/images/bottom/unselected/heart.png') // Replace with your 'unfilled heart' icon
          }
          style={styles.iconStyle}
        />
        <Text style={styles.textItem}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your styles for dropdown and dropdownItem
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textItem: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
  },
  dropdown: {
    // ... your styles for the dropdown container
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default DropdownMenu;

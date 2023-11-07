import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

const SearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBox}>
        {/* Uncomment and use the icons if you have them available */}
        {/* <MaterialIcons name="search" size={20} color="gray" /> */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search key words"
          placeholderTextColor="gray" // This should be the color you desire for the placeholder text
        />
        {/* <MaterialIcons name="mic" size={20} color="gray" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center content horizontally
    paddingTop: 100, // Adjust top padding to match the example
    fontFamily: 'PlayfairDisplay-Regular',
  },
  header: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 32, // Increased bottom margin
    marginLeft: 20, // Add left margin to align with the search box
    textAlign: 'center', // Align text to the left
    fontFamily: 'PlayfairDisplay-Regular',
  },
  searchBox: {
    flexDirection: 'row',
    width: '90%', // Increase the width to match the example
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 50, // Adjust for a more rounded appearance
    height: 50, // Fixed height for the search box
    alignItems: 'center',
    paddingHorizontal: 20, // Increase horizontal padding
    fontFamily: 'PlayfairDisplay-Regular',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16, // Optional: Adjust font size if necessary
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default SearchScreen;

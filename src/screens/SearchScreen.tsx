import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
// import {MaterialIcons} from '@expo/vector-icons';

const SearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBox}>
        {/* <MaterialIcons name="search" size={20} color="gray" /> */}
        <TextInput style={styles.searchInput} placeholder="Search key words" />
        {/* <MaterialIcons name="mic" size={20} color="gray" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  searchBox: {
    flexDirection: 'row',
    width: '80%',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});

export default SearchScreen;

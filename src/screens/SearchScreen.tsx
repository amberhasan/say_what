import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Uncomment if you have the icons package

const suggestions = [
  'Long live cowgirls',
  'Girls trips forever',
  'The girls are girling',
  'The girls room',
  // ... other suggestions
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Add search handling logic here if necessary
  };

  const renderSuggestion = ({item}) => (
    <TouchableOpacity style={styles.suggestionItem}>
      <Text style={styles.suggestionText}>"{item}"</Text>
      <Image
        source={require('../assets/images/utils/forward.png')}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.header}>Search</Text>
        <View style={styles.searchBox}>
          <Image
            source={require('../assets/images/utils/search.png')} // Replace with the correct path to your image
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search key words"
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={item => item}
        style={styles.suggestionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
  },
  header: {
    paddingTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25, // Increase this number to make it more rounded
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  searchIcon: {
    width: 20, // Set the width of the icon
    height: 20, // Set the height of the icon
  },
  suggestionsList: {
    backgroundColor: 'white',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingLeft: 20,
  },
  suggestionText: {
    fontSize: 22,
    fontFamily: 'OpenSans-Regular',
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },

  // Add styles for the icons in the footer if needed
});

export default SearchScreen;

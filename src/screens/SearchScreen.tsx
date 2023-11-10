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
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Filter suggestions based on the search query
    if (text) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      // If the search bar is cleared, hide the suggestions
      setFilteredSuggestions([]);
    }
  };

  const renderSuggestion = ({item}) => {
    // Split the suggestion into parts to highlight the match
    const regex = new RegExp(`(${searchQuery})`, 'i');
    const parts = item.split(regex);

    return (
      <TouchableOpacity style={styles.suggestionItem}>
        <Text style={styles.suggestionText}>
          {parts.map((part, index) =>
            regex.test(part) ? (
              <Text key={index} style={styles.highlightedText}>
                {part}
              </Text>
            ) : (
              part
            ),
          )}
        </Text>
        <Image
          source={require('../assets/images/utils/forward.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.header}>Search</Text>
        <View style={styles.searchBox}>
          <Image
            source={require('../assets/images/utils/search.png')} // Make sure this path is correct
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
        data={filteredSuggestions} // Use filteredSuggestions here
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
  highlightedText: {
    backgroundColor: 'yellow', // Change the background color to your preference
    color: 'black', // Change the text color if necessary
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
    fontSize: 20,
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

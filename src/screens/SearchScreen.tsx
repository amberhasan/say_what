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
      {/* Uncomment and use icons if available */}
      {/* <Icon name="trending-flat" size={20} color="black" style={styles.suggestionIcon} /> */}
      <Text style={styles.suggestionText}>{item}</Text>
      {/* Image for arrow, replace with an icon if you have a vector icons package */}
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
          {/* Uncomment and use icons if available */}
          {/* <Icon name="search" size={20} color="gray" style={styles.searchIcon} /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search key words"
            placeholderTextColor="gray"
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
      {/* Footer with icons */}
      <View style={styles.footer}>
        {/* Replace these Text components with icons */}
        <Text>🏠</Text>
        <Text>💡</Text>
        <Text>❤️</Text>
        <Text>🔍</Text>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  suggestionsList: {
    backgroundColor: 'white',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  suggestionText: {
    fontSize: 16,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  // Add styles for the icons in the footer if needed
});

export default SearchScreen;

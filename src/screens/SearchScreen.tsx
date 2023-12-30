import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {capitalize} from 'lodash';
import {formattedSubcategory} from '../utils';
import {SearchScreenProps} from '../types';
import Header from '../components/Header';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Uncomment if you have the icons package

const SearchScreen = ({navigation}: {navigation: SearchScreenProps}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [subcategoryData, setSubcategoryData] = useState([]);

  const fetchSubcategoriesData = async () => {
    const categoriesResult = await firestore().collection('captions').get();
    const convertedData = [];
    categoriesResult.forEach(doc => {
      const subcategory = doc.id;
      doc.data().data.forEach((caption: string) => {
        convertedData.push({
          caption,
          subcategory,
        });
      });
    });
    setSubcategoryData(convertedData);
  };

  useEffect(() => {
    fetchSubcategoriesData();
  }, []);
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredSuggestions([]);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Filter suggestions based on the search query
    if (text) {
      const filtered = subcategoryData.filter(suggestion =>
        suggestion.caption.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      // If the search bar is cleared, hide the suggestions
      setFilteredSuggestions([]);
    }
  };

  const onSearchItemPress = item => {
    navigation.navigate('CaptionsScreen', {
      selectedCategory: item.subcategory,
      searchedCaption: item.caption,
      title: formattedSubcategory(item.subcategory)
        .split('apostrophe')
        .join("'"),
    });
  };

  const renderSuggestion = ({item}) => {
    // Split the suggestion into parts to highlight the match
    const regex = new RegExp(`(${searchQuery})`, 'i');
    const parts = item.caption.split(regex);

    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => onSearchItemPress(item)}>
        <Text style={styles.suggestionText}>
          "{''}
          {parts.map((part, index) =>
            regex.test(part) ? (
              <Text key={index} style={styles.highlightedText}>
                {part}
              </Text>
            ) : (
              part
            ),
          )}
          {''}"
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Header title="Search" showBackButton={false} />
        <View style={styles.searchContainer}>
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
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <Image
                  source={require('../assets/images/utils/x.png')}
                  style={styles.xIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <FlatList
          data={filteredSuggestions} // Use filteredSuggestions here
          renderItem={renderSuggestion}
          keyExtractor={(item, index) => item.caption + index}
          style={styles.suggestionsList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderBottomColor: 'black',
  },
  highlightedText: {
    fontFamily: 'PlayfairDisplay-Bold',
    color: 'black', // Change the text color if necessary
  },
  header: {
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
    paddingRight: 15,
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
  xIcon: {
    width: 15, // Set the width of the icon
    height: 15, // Set the height of the icon
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

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToFavorites as addToFavoritesAction} from '../actions/favoritesActions';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import Clipboard from '@react-native-community/clipboard';
import DropdownMenu from '../components/DropdownMenu';

const CaptionsScreen = ({route}) => {
  const {selectedCategory, title, searchedCaption} = route.params;
  // const phrases = captionsData[selectedCategory] || [];
  const [phrases, setPhrases] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState({});

  const fetchSubcategoriesData = async () => {
    const categoriesResult = await firestore()
      .collection('captions')
      .doc(selectedCategory)
      .get();
    setPhrases(categoriesResult.data().data);
  };

  useEffect(() => {
    fetchSubcategoriesData();
  }, []);
  const fetchFavorites = async () => {
    try {
      const result = await firestore()
        .collection('favorites')
        .doc('N3Hr8vp8DxO1cDSV1U5o')
        .get();
      setFavorites(result.data());
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch the favorites.');
      console.error('Add to Favorites Error, fetchFavorites(): ', err);
    }
  };

  const updateFavorites = async updateValues => {
    try {
      await firestore()
        .collection('favorites')
        .doc('N3Hr8vp8DxO1cDSV1U5o')
        .update(updateValues);
    } catch (err) {
      Alert.alert('Error', 'Could not update caption in favorites.');
      console.error('Error in updateFavorites(): ', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    setDropdownVisible(false);
    Alert.alert('Copied!', 'Caption copied to clipboard.');
  };

  const addToFavorites = caption => {
    dispatch(addToFavoritesAction(caption));
    setDropdownVisible(false);

    if (favorites[selectedCategory]) {
      // we have already this category, add new item
      favorites[selectedCategory].push(caption);
    } else {
      //must create new category and add new caption
      favorites[selectedCategory] = [caption];
    }
    Alert.alert('Added!', 'Caption added to favorites.');
    updateFavorites(favorites);
  };

  const removeFromFavorites = async removedCaption => {
    // fetch all favorites
    // filter select subcategory captions
    const selectFavs = favorites[selectedCategory];
    // remove from captions
    const filteredFavs = selectFavs.filter(item => item != removedCaption);
    // update favorites

    favorites[selectedCategory] = filteredFavs;
    Alert.alert('Removed!', 'Caption removed from favorites.');
    updateFavorites(favorites);
  };

  // Function to render the favorite button based on the item's favorite status
  const renderFavoriteButton = item => {
    if (
      favorites[selectedCategory] &&
      favorites[selectedCategory].includes(item)
    ) {
      return (
        <TouchableOpacity
          onPress={() => removeFromFavorites(item)}
          style={styles.dropdownItem}>
          <Image
            source={require('../assets/images/bottom/unselected/heart.png')} // Replace with your 'filled heart' icon
            style={styles.iconStyle}
          />
          <Text style={styles.textItem}>Remove from favorites</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => addToFavorites(item)}
          style={styles.dropdownItem}>
          <Image
            source={require('../assets/images/bottom/unselected/heart.png')} // Replace with your 'unfilled heart' icon
            style={styles.iconStyle}
          />
          <Text style={styles.textItem}>Add to favorites</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderCaptionItem = ({item}) => {
    console.log('item', item);
    console.log('searchedCaption', searchedCaption);
    const isSelected = item === selectedCaption;
    const isFavorite =
      favorites[selectedCategory] && favorites[selectedCategory].includes(item);

    // Determine if the item is selected to change the text color
    const itemStyle = isSelected ? styles.selectedItem : styles.listItem;

    return (
      <View style={styles.captionContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCaption(isSelected ? null : item); // Toggle the selection
            setDropdownVisible(!dropdownVisible);
          }}>
          <Text
            style={[
              itemStyle,
              searchedCaption === item && {
                fontFamily: 'PlayfairDisplay-Bold',
              },
            ]}>{`\u2022 \"${item}\"`}</Text>
        </TouchableOpacity>
        {dropdownVisible && isSelected && (
          <DropdownMenu
            caption={item}
            copyToClipboard={copyToClipboard}
            toggleFavorite={isFavorite ? removeFromFavorites : addToFavorites}
            isFavorite={isFavorite}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={title} showBackButton={true} />
      <FlatList
        data={phrases}
        renderItem={renderCaptionItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedCaption} // Adding this to ensure FlatList updates when state changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'column',
  },
  listItem: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Regular',
    color: 'black', // Default color for unselected item
  },
  selectedItem: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#FF66C3', // Pink color for selected item
  },
  textItem: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: 'black',
  },
  iconStyle: {
    width: 20, // Set the width as needed
    height: 20, // Set the height as needed
    marginRight: 10, // Add some spacing between the icon and the text
  },
  // Modify the dropdownItem to handle the layout with an icon
  dropdownItem: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
    paddingVertical: 5,
    fontSize: 18,
    color: 'black',
    borderColor: '#eee',
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    // Removed shadow styles
    elevation: 0, // Set elevation to 0 to remove shadow on Android
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default CaptionsScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import GrayButton from '../components/GrayButton';
import Clipboard from '@react-native-community/clipboard';
import Header from '../components/Header';
import DropdownMenu from '../components/DropdownMenu';
const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState({});
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchFavorites = async () => {
    try {
      const result = await firestore()
        .collection('favorites')
        .doc('N3Hr8vp8DxO1cDSV1U5o')
        .get();
      setFavorites(result.data());
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch the favorites.');
      console.error('Fetch Favorites Error: ', err);
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

  const removeFromFavorites = async (subcategory, removedCaption) => {
    const updatedCaptions = favorites[subcategory].filter(
      caption => caption !== removedCaption,
    );
    setFavorites({
      ...favorites,
      [subcategory]: updatedCaptions,
    });
    // Update firestore here if necessary
  };
  const renderFavoriteItem = (category, caption) => {
    const isSelected = caption === selectedCaption;

    // Define a style for the selected item
    const itemStyle = isSelected
      ? [styles.itemText, styles.selectedItemText] // Apply the selected style
      : styles.itemText; // Regular style

    return (
      <View style={styles.itemContainer} key={caption}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCaption(isSelected ? null : caption); // Toggle the selection
            setDropdownVisible(!dropdownVisible || selectedCaption !== caption);
          }}>
          <Text style={itemStyle}>{`\u2022 \"${caption}\"`}</Text>
        </TouchableOpacity>
        {dropdownVisible && isSelected && (
          <DropdownMenu
            caption={caption}
            copyToClipboard={copyToClipboard} // Changed from copyToClipboard to onCopy
            toggleFavorite={() => removeFromFavorites(category, caption)} // Changed from onRemove to toggleFavorite
            isFavorite={true} // You need to pass the isFavorite prop based on the caption's favorite status
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Favorites" showBackButton={false} />
      {_.map(favorites, (captions, subcategory) => {
        // Check if the captions array is empty and return null to render nothing
        if (captions.length === 0) {
          return null;
        }
        return (
          <View key={subcategory} style={styles.categoryContainer}>
            <GrayButton
              item={subcategory}
              onPress={() => {}}
              buttonText={{
                fontFamily: 'PlayfairDisplay-Regular',
                fontSize: 18,
                paddingLeft: 20,
              }}
              buttonContainer={{
                width: 180,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 20,
              }}
              buttonImageContainer={{
                alignItems: 'flex-start',
              }}
            />
            {captions.map((caption, index) =>
              renderFavoriteItem(subcategory, caption, index),
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'PlayfairDisplay-Regular',
    // other styles for your item text
  },
  selectedItemText: {
    color: '#FF66C3', // This is the color that will be applied when an item is selected
    fontFamily: 'PlayfairDisplay-Bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 10,
  },
  itemContainer: {
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  dropdown: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dropdownText: {
    fontSize: 16,
    marginLeft: 10,
  },
  // Add other styles as needed
});

export default FavoritesScreen;

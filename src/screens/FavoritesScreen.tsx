import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import GrayButton from '../components/GrayButton';
// Make sure you import GrayButton and other components correctly

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

    return (
      <View style={styles.itemContainer} key={caption}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCaption(isSelected ? null : caption);
            setDropdownVisible(!isSelected);
          }}>
          <Text style={styles.itemText}>{`\u2022 \"${caption}\"`}</Text>
        </TouchableOpacity>
        {dropdownVisible && isSelected && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => copyToClipboard(caption)}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Copy to clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                removeFromFavorites(category, caption);
                setDropdownVisible(false);
              }}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Remove from favorites</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
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
                paddingLeft: 20,
              }}
              buttonContainer={{
                width: 180,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 50,
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
  },
  itemText: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'PlayfairDisplay-Regular',
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

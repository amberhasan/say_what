import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import GrayButton from '../components/GrayButton';
import Clipboard from '@react-native-community/clipboard';
import Header from '../components/Header';
import DropdownMenu from '../components/DropdownMenu';
import {formattedSubcategory} from '../utils';
import {useSelector} from 'react-redux';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState({});
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const deviceId = useSelector(state => state.app.deviceId);
  console.log('deviceId', deviceId);

  const fetchFavorites = async () => {
    try {
      const result = await firestore()
        .collection('favorites')
        .doc(deviceId)
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

  const updateFavorites = async updateValues => {
    try {
      await firestore()
        .collection('favorites')
        .doc(deviceId)
        .update(updateValues);
    } catch (err) {
      Alert.alert('Error', 'Could not update caption in favorites.');
      console.error('Error in updateFavorites(): ', err);
    }
  };
  const removeFromFavorites = async (subcategory, removedCaption) => {
    console.log('BEFORE REMOVING');
    console.log(favorites[subcategory]);
    const updatedCaptions = favorites[subcategory].filter(
      caption => caption !== removedCaption,
    );
    console.log('AFTER REMOVING');
    console.log(updatedCaptions);
    setFavorites({
      ...favorites,
      [subcategory]: updatedCaptions,
    });
    updateFavorites({
      ...favorites,
      [subcategory]: updatedCaptions,
    });
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

  // { a: [], b:[], c:[]}

  // [[], [], []]

  const isEmpty = object => {
    let result = true;
    Object.values(object).map(arr => {
      if (arr.length > 0) {
        result = false;
      }
    });
    return result;
  };

  console.log('favorites', favorites);
  console.log('length', Object.values(favorites).length);
  if (isEmpty(favorites)) {
    return (
      <>
        <Header title="Favorites" showBackButton={false} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontSize: 38,
              fontFamily: 'PlayfairDisplay-Bold',
            }}>
            No captions found
          </Text>
          {/* <View style={{flex: 0}}> */}
          <GrayButton
            item={'Start saving!'}
            onPress={() => {
              navigation.navigate('CategoriesScreen');
            }}
            buttonText={{
              fontFamily: 'PlayfairDisplay-Regular',
              fontSize: 25,
            }}
            buttonContainer={{
              width: '65%',
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              // marginBottom: 5, // Make sure this value is small to reduce space
              // paddingLeft: 20,
            }}
            // buttonImageContainer={{
            //   alignItems: 'flex-start',
            // }}
          />
          {/* </View> */}
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Header title="Favorites" showBackButton={false} />
        <ScrollView style={{flexGrow: 1}}>
          {_.map(favorites, (captions, subcategory) => {
            // Check if the captions array is empty and return null to render nothing
            if (captions.length === 0) {
              return null;
            }
            return (
              <View key={subcategory} style={styles.categoryContainer}>
                <GrayButton
                  item={formattedSubcategory(subcategory)}
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
                    marginBottom: 5, // Make sure this value is small to reduce space
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 18,
    marginVertical: 0,
    fontFamily: 'PlayfairDisplay-Regular',
    // other styles for your item text
  },
  selectedItemText: {
    color: '#FF66C3', // This is the color that will be applied when an item is selected
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});

export default FavoritesScreen;

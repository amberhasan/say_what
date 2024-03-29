import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import Clipboard from '@react-native-community/clipboard';
import Header from '../components/Header';
import DropdownMenu from '../components/DropdownMenu';
import {formattedSubcategory} from '../utils';
import {useSelector} from 'react-redux';
import Button from '../components/Button';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const deviceId = useSelector(state => state.app.deviceId);

  const fetchFavorites = async () => {
    try {
      const result = await firestore()
        .collection('favorites')
        .doc(deviceId)
        .get();
      if (result.data()) {
        setFavorites(result.data());
      }
      setLoading(false);
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch the favorites.');
      console.error('Fetch Favorites Error: ', err);
      setLoading(false);
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
    const updatedCaptions = favorites[subcategory].filter(
      caption => caption !== removedCaption,
    );
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

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="gray" size={'large'} />
      </View>
    );
  }

  const isEmpty = object => {
    // let result = true;
    const values = Object.values(object);
    for (let i = 0; i < values.length; i++) {
      if (values[i].length > 0) {
        return false;
      }
    }
    return true;
  };

  if (isEmpty(favorites) && !loading) {
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
          <Button
            title={'Start saving!'}
            onPress={() => {
              navigation.navigate('Discover');
            }}
          />
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
                <Button
                  title={formattedSubcategory(subcategory)}
                  onPress={() => {}}
                  buttonTextStyle={{
                    fontFamily: 'PlayfairDisplay-Regular',
                    fontSize: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                  buttonContainer={{
                    marginLeft: 20,
                    borderRadius: 5,
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
    fontFamily: 'PlayfairDisplay-Regular',
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

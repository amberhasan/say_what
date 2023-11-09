import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Clipboard,
  Image,
  Alert,
} from 'react-native';
import captionsData from '../data/captions/captionsData';
import {useDispatch} from 'react-redux';
import {addToFavorites as addToFavoritesAction} from '../actions/favoritesActions';
import Header from '../components/Header';

const CaptionsScreen = ({route}) => {
  const {selectedCategory} = route.params;
  const phrases = captionsData[selectedCategory] || [];
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const copyToClipboard = text => {
    Clipboard.setString(text);
    setDropdownVisible(false);
    Alert.alert('Copied!', 'Caption copied to clipboard.');
  };

  const addToFavorites = caption => {
    dispatch(addToFavoritesAction(caption));
    setDropdownVisible(false);
    Alert.alert('Added!', 'Caption added to favorites.');
  };

  const renderCaptionItem = ({item}) => {
    const isSelected = item === selectedCaption;

    // Determine if the item is selected to change the text color
    const itemStyle = isSelected ? styles.selectedItem : styles.listItem;

    return (
      <View style={styles.captionContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCaption(isSelected ? null : item); // Toggle the selection
            setDropdownVisible(!dropdownVisible);
          }}>
          <Text style={itemStyle}>{`\u2022 \"${item}\"`}</Text>
        </TouchableOpacity>
        {dropdownVisible && isSelected && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => copyToClipboard(item)}
              style={styles.dropdownItem}>
              <Image
                source={require('../assets/images/utils/link.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.textItem}>Copy to clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addToFavorites(item)}
              style={styles.dropdownItem}>
              <Image
                source={require('../assets/images/bottom/unselected/heart.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.textItem}>Add to favorites</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={selectedCategory} />
      {/* <Text style={styles.title}>{selectedCategory}</Text> */}
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

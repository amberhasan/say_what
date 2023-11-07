import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Clipboard,
  Alert, // Import Alert to provide feedback
} from 'react-native';
import captionsData from '../data/captions/captionsData'; // Import the data
import {useDispatch} from 'react-redux';
import {addToFavorites as addToFavoritesAction} from '../actions/favoritesActions'; // adjust the path as necessary

const CaptionsScreen = ({route}) => {
  const {selectedCategory} = route.params;
  const phrases = captionsData[selectedCategory] || [];
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const copyToClipboard = text => {
    Clipboard.setString(text);
    setModalVisible(false);
    Alert.alert('Copied!', 'Caption copied to clipboard.');
  };

  const addToFavorites = caption => {
    dispatch(addToFavoritesAction(caption)); // Dispatch the action to add to favorites
    setModalVisible(false);
    Alert.alert('Added!', 'Caption added to favorites.');
  };

  const renderCaptionItem = ({item}) => {
    const isSelected = item === selectedCaption;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCaption(item);
          setModalVisible(true);
        }}>
        <Text style={[styles.listItem, isSelected && styles.selectedItem]}>
          {`\u2022 ${item}`}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedCategory}</Text>
      <FlatList
        data={phrases}
        renderItem={renderCaptionItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              title="Copy to clipboard"
              onPress={() => copyToClipboard(selectedCaption)}
            />
            <Button
              title="Add to favorites"
              onPress={() => addToFavorites(selectedCaption)}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black', // Change this to match your desired bullet point color
    marginRight: 10,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: 'white',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_Regular',
  },
  listItem: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_Regular',
  },
  selectedItem: {
    color: '#FF66C3', // Change this to your preferred shade of pink
    fontFamily: 'PlayfairDisplay_Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default CaptionsScreen;

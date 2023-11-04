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
} from 'react-native';
import captionsData from '../data/captions/captionsData'; // Import the data

const CaptionsScreen = ({route}) => {
  const {selectedCategory} = route.params;
  const phrases = captionsData[selectedCategory] || [];
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    // Close the modal
    setModalVisible(false);
    // You might want to show a toast or alert to the user that the text has been copied.
  };

  const addToFavorites = text => {
    // Implement the logic to save the text to favorites
    setModalVisible(false);
    // Show confirmation to the user if needed
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
          {`\u2022 ${item}`} {/* Unicode bullet point added here */}
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
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black', // Change this to match your desired bullet point color
    marginRight: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    fontSize: 20,
  },
  selectedItem: {
    color: '#FF66C3', // Change this to your preferred shade of pink
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  // ... other styles remain unchanged
});

export default CaptionsScreen;

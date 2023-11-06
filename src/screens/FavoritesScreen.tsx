import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const FavoritesScreen = () => {
  // Use useSelector to get the favorites array from the Redux store

  const favorites = useSelector(state => state.favorites).favorites;

  // Render an individual favorite item
  const renderFavoriteItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length > 0 ? (
        <View>
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        // If there are no favorites, show a message and button
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>No captions found</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start saving!</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 18,
  },
});

export default FavoritesScreen;

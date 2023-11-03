import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FavoritesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>No captions found</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start saving!</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 50,
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
});

export default FavoritesScreen;

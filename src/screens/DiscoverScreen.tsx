import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import LocationScreen from './CategoriesScreen';

const DiscoverScreen: React.FC = ({navigation}) => {
  const categories = [
    'Location',
    'Mood',
    'Ocasion',
    'Holiday',
    'Season',
    'Lifestyle',
    'Universal',
  ];

  const handleCategoryClick = (category: string) => {
    if (category === 'Location') {
      navigation.navigate('CategoriesScreen'); // <-- Navigate to the Location screen
    }
    // You can add more conditions here for other categories if needed
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCategoryClick(item)} // <-- Add onPress here
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
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
  button: {
    width: 280,
    height: 60,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});

export default DiscoverScreen;

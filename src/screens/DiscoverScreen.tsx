import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import categoryData from '../data/captions/categoryData';

const DiscoverScreen: React.FC = ({navigation}) => {
  const categories = [
    'Location',
    'Mood',
    'Occasion',
    'Holiday',
    'Season',
    'Lifestyle',
    'Universal',
  ];

  const handleCategoryClick = (category: string) => {
    navigation.navigate('CategoriesScreen', {
      title: category,
      categories: categoryData[category],
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCategoryClick(item)}>
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

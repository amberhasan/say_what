import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import categoryData from '../data/captions/categoryData';
import {ImageBackground} from 'react-native';
import buttonImage from '../assets/images/functional/gray_button.png'; // Update the path according to your project structure
import GrayButton from '../components/GrayButton';

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
          <GrayButton item={item} onPress={handleCategoryClick} />
        )}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 60,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden', // This is to ensure the borderRadius is applied to the image as well
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
  },
});

export default DiscoverScreen;

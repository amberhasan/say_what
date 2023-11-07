import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import categoryData from '../data/captions/categoryData';
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default DiscoverScreen;

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import categoryData from '../data/captions/categoryData';
import GrayButton from '../components/GrayButton';
import firestore from '@react-native-firebase/firestore';
import captionsData from '../data/captions/captionsData';

const CategoriesScreen: React.FC = ({navigation}) => {
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
    navigation.navigate('SubcategoriesScreen', {
      title: category,
      categories: categoryData[category.toLowerCase()],
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

export default CategoriesScreen;

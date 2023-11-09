import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import GrayButton from '../components/GrayButton';
import firestore from '@react-native-firebase/firestore';
import captionsData from '../data/captions/captionsData';
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

  // const [categoryData, setCategoryData] = useState([]);

  // const fetchCategoriesData = async () => {
  //   const categoriesResult = await firestore().collection('categories').get();
  //   let cat: any = {};
  //   categoriesResult.forEach(doc => {
  //     cat[doc.id] = doc.data().data;

  //     console.log('data', doc.id);
  //     console.log('data', doc.data().data);
  //   });
  //   console.log('cat', cat);
  //   setCategoryData(cat);
  // };

  // useEffect(() => {
  //   fetchCategoriesData();
  // }, []);

  // const captions = Object.keys(captionsData);

  // const uploadCaptions = async () => {
  //   // get collection we will document and on the document we update the values
  //   try {
  //     Object.values(captionsData).forEach(async (data, index) => {
  //       await firestore()
  //         .collection('captions')
  //         .doc(captions[index].toLowerCase())
  //         .set({
  //           data,
  //         });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //*
  // const uploadCategories = async () => {
  //   // get collection we will document and on the document we update the values
  //   try {
  //     Object.values(categoryData).forEach(async (data, index) => {
  //       await firestore()
  //         .collection('categories')
  //         .doc(categories[index].toLowerCase())
  //         .set({
  //           data,
  //         });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //*/
  // useEffect(() => {
  //   uploadCaptions();
  // }, []);

  /*
    const uploadCategories = async () => {
    // get collection we will document and on the document we update the values
    try {
      categoryData.forEach(async (data, index) => {
        await firestore()
          .collection('categories')
          .doc(categories[index].toLowerCase())
          .update({
            quiz,
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  //*/

  // const imageSet = {
  //   1: require('image/path'),
  // };

  const handleCategoryClick = (category: string) => {
    // console.log('category', category);
    navigation.navigate('CategoriesScreen', {
      title: category,
      categories: categoryData[category],
      // categories: categoryData[category.toLowerCase()],
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import CategoryBox from '../components/CategoryBox'; // Make sure the path is correct based on your file structure
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import {capitalize} from 'lodash';

const SubcategoriesScreen = ({navigation, route}) => {
  const {category} = route.params;
  const [subcategories, setSubcategories] = useState([]);

  const fetchSubcategoriesData = async () => {
    const result = await firestore()
      .collection('categories')
      .doc(category)
      .get();
    console.log('category', category);
    console.log('result', result.data().data);
    setSubcategories(result.data().data);
  };

  useEffect(() => {
    fetchSubcategoriesData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title={capitalize(category)} showBackButton={true} />
      <View style={styles.grid}>
        {subcategories.map((category, index) => (
          <CategoryBox
            key={index}
            category={category}
            onPress={() =>
              navigation.navigate('CaptionsScreen', {
                title: category.label,
                selectedCategory: category.subcategory.toLowerCase(),
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Changed this to 'space-around' for even spacing around items
    paddingHorizontal: 16, // Adjust the horizontal padding of the whole grid to match your design
  },
  box: {
    width: '42%', // Slightly increase the width if you decrease the margin/padding
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Specify vertical margin to space out items vertically
    padding: 10,
  },
  // ... other styles if needed
});

export default SubcategoriesScreen;

import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import CategoryBox from '../components/CategoryBox'; // Make sure the path is correct based on your file structure

const CategoriesScreen = ({navigation, route}) => {
  const {title, categories} = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            category={category}
            onPress={() =>
              navigation.navigate('CaptionsScreen', {
                selectedCategory: category.label,
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // ... other styles if needed
});

export default CategoriesScreen;

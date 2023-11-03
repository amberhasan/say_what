import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CategoriesScreen = ({navigation, route}) => {
  const {title, categories} = route.params; // Extracting title and categories from route.params
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={() =>
              navigation.navigate('CaptionsScreen', {
                selectedCategory: category.label,
              })
            }>
            <Text style={styles.icon}>{category.icon}</Text>
            <Text style={styles.label}>{category.label}</Text>
          </TouchableOpacity>
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
  box: {
    width: '45%', // adjust according to your preference
    height: 120, // adjust according to your preference
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    fontSize: 40, // adjust according to your preference
  },
  label: {
    fontSize: 18, // adjust according to your preference
    marginTop: 10,
  },
});

export default CategoriesScreen;

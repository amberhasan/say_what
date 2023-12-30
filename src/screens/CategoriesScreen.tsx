import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {capitalize} from 'lodash';
import Header from '../components/Header';

const CategoriesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async () => {
    const categoriesResult = await firestore().collection('categories').get();
    const cats = [];
    categoriesResult.forEach(category => {
      cats.push(category.id);
    });
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const handleCategoryClick = category => {
    navigation.navigate('SubcategoriesScreen', {
      category: category.toLowerCase(),
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={'Discover'} showBackButton={false} />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCategoryClick(item)}>
            <Text style={styles.buttonText}>{capitalize(item)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingVertical: 30,
    width: '100%',
    alignItems: 'center', // Center items in the flatlist
  },
  button: {
    backgroundColor: '#FFEEF6', // A lighter shade of pink
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Fully rounded corners
    marginVertical: 8, // Adjusted vertical margin
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300, // Ensure a minimum width for all buttons
    shadowColor: 'rgba(0, 0, 0, 0)', // Light shadow
    shadowOpacity: 1,
    elevation: 6,
  },
  buttonText: {
    color: '#000', // Dark text color
    fontSize: 28,
    fontFamily: 'PlayfairDisplay-Bold', // Assuming you have this font integrated
  },
});

export default CategoriesScreen;

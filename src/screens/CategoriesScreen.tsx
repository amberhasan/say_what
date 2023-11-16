import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import GrayButton from '../components/GrayButton';
import firestore from '@react-native-firebase/firestore';
import {capitalize} from 'lodash';

const CategoriesScreen: React.FC = ({navigation}) => {
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

  const handleCategoryClick = (category: string) => {
    navigation.navigate('SubcategoriesScreen', {
      category: category.toLowerCase(),
      // categories: categoryData[category.toLowerCase()],
    });
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <GrayButton item={capitalize(item)} onPress={handleCategoryClick} />
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
    paddingTop: 150,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default CategoriesScreen;

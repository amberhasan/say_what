import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import SmallGrayButton from '../components/SmallGrayButton';
import CategoriesScreen from './CategoriesScreen';
import GrayButton from '../components/GrayButton';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

const FavoritesScreen = ({navigation}) => {
  // Use useSelector to get the favorites array from the Redux store

  // const favorites = useSelector(state => state.favorites).favorites;
  const [favorites, setFavorites] = useState({});

  const fetchFavorites = async () => {
    try {
      const result = await firestore()
        .collection('favorites')
        .doc('N3Hr8vp8DxO1cDSV1U5o')
        .get();
      setFavorites(result.data());
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch the favorites.');
      console.error('Add to Favorites Error, fetchFavorites(): ', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Render an individual favorite item
  const renderFavoriteItem = ({item}) => (
    <View style={styles.itemContainer}>
      <SmallGrayButton item={'Favorites'} onPress={() => {}} />
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const handleStartSaving = () => {
    navigation.navigate('CategoriesScreen'); // Navigate to the "Discover" screen
  };

  const newResult = _.map(favorites, (item, index) => {
    console.log({
      item,
      index,
    });
  });

  // return <Text>Test</Text>;
  // If there are no favorites, show a message and button
  /*
  {
    lake : [1,2,3,45,]
  }
*/
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {_.map(favorites, (captions, subcategory) => {
        return (
          <View style={styles.itemContainer}>
            <SmallGrayButton item={subcategory} onPress={() => {}} />
            {captions.map(caption => (
              <Text style={styles.itemText}>{caption}</Text>
            ))}
          </View>
        );
      })}
      {/* <View style={styles.messageContainer}></View>
        <Text style={styles.messageText}>No captions found</Text>
        <GrayButton item={'Start saving!'} onPress={handleStartSaving} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
  messageText: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Regular',
  },
});

export default FavoritesScreen;

/**
 
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const data = {
  mountains : [],
  lake : []
}

const data2 = [
  {
   title : mountain,
   data:[] 
  }
]
 */

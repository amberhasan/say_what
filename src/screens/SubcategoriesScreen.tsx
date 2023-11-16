import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import CategoryBox from '../components/CategoryBox'; // Make sure the path is correct based on your file structure
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import {capitalize} from 'lodash';

const SubcategoriesScreen = ({navigation, route}) => {
  const {category} = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollViewRef = useRef(null);

  const fetchSubcategoriesData = async () => {
    const result = await firestore()
      .collection('categories')
      .doc(category)
      .get();
    setSubcategories(result.data().data);
  };

  useEffect(() => {
    fetchSubcategoriesData();
  }, []);

  const handleScroll = event => {
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;

    if (scrollOffset + scrollViewHeight >= contentHeight) {
      // ScrollView has reached the end
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Header title={capitalize(category)} showBackButton={true} />
        <Image
          source={require('../assets/images/utils/scroll.png')}
          style={{
            position: 'absolute',
            zIndex: 100,
            height: 25,
            width: 25,
            right: 0,
            bottom: 0,
            marginRight: 10,
            marginBottom: 10,
            opacity: isAtEnd ? 0 : 1, // Hide the scroll image when at the end
          }}
        />
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          onContentSizeChange={() => {
            // scrollViewRef.current.scrollToEnd({animated: false});
          }}>
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
      </View>
    </SafeAreaView>
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
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Changed this to 'space-around' for even spacing around items
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

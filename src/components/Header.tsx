import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderProps} from '../types';

const Header = ({title, showBackButton = true}: HeaderProps) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/utils/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {showBackButton && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  backButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    height: 24, // Adjust as necessary
    width: 24, // Adjust as necessary
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'PlayfairDisplay-Regular',
    textAlign: 'center',
  },
  placeholder: {
    width: 50, // To maintain the title in center if there is no back button
  },
  // ... other styles ...
});

export default Header;

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderProps} from '../types';
import fonts from '../theme/fonts';

const Header = ({title, showBackButton = true, style}: HeaderProps) => {
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
        <Text style={[styles.title, style]}>{title}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  backImage: {
    height: 45, // Adjust as necessary
    width: 45, // Adjust as necessary
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: fonts.playfairDisplayRegular,
    textAlign: 'center',
  },
  placeholder: {
    width: 50, // To maintain the title in center if there is no back button
    height: 50,
    marginRight: 30,
  },
});

export default Header;

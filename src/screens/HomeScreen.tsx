import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> "Capfluencer" </Text>
        <Text style={styles.subtitle}> A CAPTION APP </Text>
      </View>
      <View style={styles.captionContainer}>
        <Text style={styles.caption1}> trendy, </Text>
        <Text style={styles.caption2}> relatable, </Text>
        <Text style={styles.caption3}> & relevant. </Text>
        <Text style={styles.footer}> ALL IN ONE PLACE </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 58,
    fontWeight: 'bold',
    textAlign: 'center', // Center text horizontally
    marginTop: 20, // Add some margin at the top to push it down a bit
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 40,
  },
  captionContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center the captions vertically
  },
  caption1: {
    fontFamily: 'LeagueSpartan-Bold',
    fontSize: 90,
    textAlign: 'left',
  },
  caption2: {
    fontFamily: 'LeagueSpartan-Bold',
    fontSize: 70,
    textAlign: 'left',
  },
  caption3: {
    fontFamily: 'LeagueSpartan-Bold',
    fontSize: 50,
    textAlign: 'left',
  },
  footer: {
    fontFamily: 'Sanchez-Regular',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    paddingTop: 10, // Add some padding at the top
    marginBottom: 40, // Add some margin at the bottom
  },
});

export default HomeScreen;

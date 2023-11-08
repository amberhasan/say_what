import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> "Say, What?" </Text>
      <Text style={styles.subtitle}> A CAPTION APP </Text>
      <View style={styles.captionContainer}>
        <Text style={styles.caption1}> trendy, </Text>
        <Text style={styles.caption2}> relatable, </Text>
        <Text style={styles.caption3}> & relevant. </Text>
      </View>
      <Text style={styles.footer}> ALL IN ONE PLACE </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 20, // adjusted for alignment to the left
    paddingRight: 20, // keep your padding consistent
  },
  title: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 48, // adjusted size; change as needed
    fontWeight: 'bold',
    textAlign: 'left', // align text to the left
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 22,
    fontWeight: '300', // already set to a lighter weight
    textAlign: 'left',
    marginBottom: 40, // adjusted spacing; change as needed
  },
  captionContainer: {
    alignItems: 'flex-start',
  },
  caption1: {
    fontFamily: 'LeagueSpartan-Black', // adjusted to the bold version if available
    fontSize: 64.9, // keep your largest font size here
    textAlign: 'left', // align text to the left
  },
  caption2: {
    fontFamily: 'LeagueSpartan-Black',
    fontSize: 53.4, // second largest font size
    textAlign: 'left',
  },
  caption3: {
    fontFamily: 'LeagueSpartan-Black',
    fontSize: 53.4, // same size as caption2
    textAlign: 'left',
  },
  footer: {
    fontFamily: 'Sanchez-Regular',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    marginTop: 40, // adjusted spacing; change as needed
  },
});

export default HomeScreen;

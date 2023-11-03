import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> "Say, What?" </Text>
      <Text style={styles.subtitle}> A CAPTION APP </Text>
      <Text style={styles.caption}> trendy, </Text>
      <Text style={styles.caption}> relatable, </Text>
      <Text style={styles.caption}> & relevant. </Text>
      <Text style={styles.footer}> ALL IN ONE PLACE </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 50,
  },
  caption: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: '300',
  },
});

export default HomeScreen;

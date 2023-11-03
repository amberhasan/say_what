import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const CaptionsScreen = () => {
  const phrases = [
    'Mountains + Me',
    'All uphill/downhill from here',
    'See you on the slopes',
    'Ski ya later',
    '______ (location) looks good in white',
    'On top of the world',
    'Took the scenic route',
    'Peaked',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mountains</Text>
      <FlatList
        data={phrases}
        renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    fontSize: 20,
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default CaptionsScreen;

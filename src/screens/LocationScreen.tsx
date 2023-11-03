import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Location = () => {
  const locations = [
    {icon: '🏔', label: 'Mountains'},
    {icon: '🏖', label: 'Beach'},
    {icon: '⛵', label: 'Lake'},
    {icon: '🌵', label: 'Desert'},
    {icon: '👒', label: 'Country'},
    {icon: '🏙', label: 'City'},
    {icon: '✈️', label: 'Abroad'},
    {icon: '🏡', label: 'Home'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>
      <View style={styles.grid}>
        {locations.map((location, index) => (
          <TouchableOpacity key={index} style={styles.box}>
            <Text style={styles.icon}>{location.icon}</Text>
            <Text style={styles.label}>{location.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '45%', // adjust according to your preference
    height: 120, // adjust according to your preference
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    fontSize: 40, // adjust according to your preference
  },
  label: {
    fontSize: 18, // adjust according to your preference
    marginTop: 10,
  },
});

export default Location;

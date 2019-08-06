import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <Text>Links Screen</Text>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Link',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default ({style, title}) => (
  <View style={style}>
    <Text style={styles.title}>
      {(title[0] ?? '').toUpperCase() + title.slice(1).replace('-', ' ')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    height: 20,
    textAlign: 'right',
    fontSize: 11,
    color: '#666',
  },
});

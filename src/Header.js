import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export default ({style, title, onSettingsPress}) => (
  <View style={style}>
    <Text style={styles.title}>
      {(title[0] ?? '').toUpperCase() + title.slice(1).replace('-', ' ')}
    </Text>
    <Pressable
      onPress={onSettingsPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EEF2FF' : 'transparent',
        },
        styles.wrapperCustom,
      ]}>
      <Text style={styles.menu}>☰</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 11,
    color: '#666',
    paddingTop: 4,
    paddingBottom: 4,
  },
  menu: {
    fontSize: 18,
    color: '#666',
    lineHeight: 16,
    padding: 5,
    paddingLeft: 4,
    paddingRight: 4,
  },
});

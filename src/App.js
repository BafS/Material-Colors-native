/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {StyleSheet, View} from 'react-native';

import ColorsPanel from './ColorsPanel';
import ColorsListPanel from './ColorsListPanel';
import Header from './Header';
import colors from './colors';

const selectedColors = colors.material.colors;

const App: () => Node = () => {
  const [colorName, setColorName] = useState('');

  const selectedColor = selectedColors[colorName]
    ? colorName
    : Object.keys(selectedColors)[0];

  return (
    <View style={styles.container}>
      <Header style={styles.header} title={selectedColor}/>
      <ColorsListPanel
        style={styles.colorsListPanel}
        colors={selectedColors}
        selected={selectedColor}
        onClick={setColorName}
      />
      <ColorsPanel
        style={styles.colorsPanel}
        name={selectedColor}
        palette={selectedColors[selectedColor]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  header: {
    position: 'absolute',
    height: 25,
    paddingTop: 8,
    paddingRight: 13,
    top: 0,
    right: 0,
    left: 0,
  },

  colorsListPanel: {
    padding: 5,
    paddingTop: 4,
    paddingBottom: 20,
    borderRightColor: '#eee',
    borderRightWidth: 1,
  },

  colorsPanel: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default App;

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
import colors from './colors';

const selectedColors = colors.material.colors;

const App: () => Node = () => {
  const [colorName, setColorName] = useState('');

  const selectedColor = selectedColors[colorName]
    ? colorName
    : Object.keys(selectedColors)[0];

  return (
    <View style={styles.container}>
      <ColorsListPanel
        style={styles.leftPane}
        colors={selectedColors}
        selected={selectedColor}
        onClick={setColorName}
      />
      <ColorsPanel
        style={styles.rightPane}
        name={selectedColor}
        palette={selectedColors[selectedColor]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },

  leftPane: {
    marginTop: 26,
    padding: 5,
    paddingTop: 4,
    paddingBottom: 20,
    borderRightColor: '#eee',
    borderRightWidth: 1,
  },

  rightPane: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default App;

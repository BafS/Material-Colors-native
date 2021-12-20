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

import ColorsPanel from './src/ColorsPanel';
import ColorsListPanel from './src/ColorsListPanel';
import {colors} from './src/colors';

const App: () => Node = () => {
  const [colorName, setColorName] = useState('red');

  return (
    <View style={styles.container}>
      <ColorsListPanel
        style={styles.leftPane}
        colors={colors}
        selected={colorName}
        onClick={setColorName}
      />
      <ColorsPanel
        style={styles.rightPane}
        name={colorName}
        palette={colors[colorName]}
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

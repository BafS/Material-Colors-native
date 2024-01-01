/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import {RecoilRoot, useRecoilValue} from 'recoil';
import {StyleSheet, View, Animated} from 'react-native';

import ColorsPanel from './ColorsPanel';
import ColorsListPanel from './ColorsListPanel';
import Header from './Header';
import Settings from './Settings';
import colors from './colors';
import {settingsState} from './atoms';

const Main = () => {
  const settings = useRecoilValue(settingsState);

  const [colorName, setColorName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const selectedColorTheme = colors[settings.colorTheme].colors;

  const selectedColor = selectedColorTheme[colorName]
    ? colorName
    : Object.keys(selectedColorTheme)[0];

  const hasCategories = selectedColor !== '_default';

  const toggleSettings = () => setShowSettings(!showSettings);

  const springAnimSettings = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(springAnimSettings, {
      toValue: showSettings ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [springAnimSettings, showSettings]);

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title={hasCategories ? selectedColor : colors[settings.colorTheme].name}
        onSettingsPress={toggleSettings}
      />
      {showSettings ? (
        <Animated.View
          style={[
            {...styles.settings, left: hasCategories ? 36 : 0},
            {
              opacity: springAnimSettings,
            },
          ]}>
          <Settings onDonePress={toggleSettings} />
        </Animated.View>
      ) : null}
      {hasCategories ? (
        <ColorsListPanel
          style={styles.colorsListPanel}
          colors={selectedColorTheme}
          selected={selectedColor}
          onClick={setColorName}
        />
      ) : null}
      <ColorsPanel
        style={styles.colorsPanel}
        colorFormat={settings.colorFormat}
        name={selectedColor}
        palette={selectedColorTheme[selectedColor]}
      />
    </View>
  );
};

const App: () => Node = () => (
  <RecoilRoot>
    <Main />
  </RecoilRoot>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    position: 'absolute',
    height: 26,
    paddingTop: 5,
    paddingRight: 5,
    top: 0,
    right: 0,
  },

  settings: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 6,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 2,
    left: 0,
    right: 0,
    top: 26,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
  },

  colorsListPanel: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 35,
    paddingTop: 4,
    paddingBottom: 9,
  },

  colorsPanel: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderLeftColor: '#eee',
    borderLeftWidth: 1,
  },
});

export default App;

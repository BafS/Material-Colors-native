import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native-macos';

import ColorsPanel from './src/ColorsPanel';
import ColorsListPanel from './src/ColorsListPanel';
import { colors } from './src/colors';

class MaterialColors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colorName: 'red'
    };

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(colorName) {
    this.setState({
      colorName
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ColorsListPanel
          style={styles.leftPane}
          colors={colors}
          selected={this.state.colorName}
          onClick={this.changeColor} />
        <ColorsPanel
          style={styles.rightPane}
          name={this.state.colorName}
          palette={colors[this.state.colorName]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },

  leftPane: {
    marginTop: 26,
    padding: 6,
    paddingTop: 4,
    paddingBottom: 20
  },

  rightPane: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 10
  },
});

AppRegistry.registerComponent('MaterialColors', () => MaterialColors);

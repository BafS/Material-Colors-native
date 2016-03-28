import React, {
  AppRegistry,
  StyleSheet,
  View,
  Clipboard,
  TouchableOpacity
} from 'react-native-desktop';

import ColorsPanel from './src/ColorsPanel';
import { colors } from './src/colors';

const ColorCircle = ({ color, selected }) => {
  return (
    <View style={{
        width: 15,
        height: 15,
        margin: 5,
        borderRadius: 20,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }} >
      {selected ?
      <View style={{
          width: 23,
          height: 23,
          borderWidth: 2,
          borderColor: color,
          borderRadius: 25,
        }} /> : null}
    </View>
  );
};

const ColorsListPanel = ({ colors, style, onClick, selected }) => {
  return (
    <View style={style}>
    {Object.keys(colors).map((value, index) => {
      const isSelected = value === selected;
      return (
        <TouchableOpacity
          key={index}
          activeOpacity={0.6}
          onPress={() => onClick(value)} >
          <ColorCircle {...colors[value]['500']} selected={isSelected} />
        </TouchableOpacity>
      );
    })}
    </View>
  );
};

class MaterialColors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colorName: 'red'
    };

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(colorName) {
    Clipboard.setString(colorName);
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
    backgroundColor: '#fff',
  },

  leftPane: {
    marginTop: 26,
    padding: 6,
    paddingTop: 4,
    paddingBottom: 20,
    borderRightWidth: 1,
    borderRightColor: '#eee'
  },

  rightPane: {
    flex: 1,
    paddingTop: 0,
    padding: 10
  },
});

AppRegistry.registerComponent('MaterialColors', () => MaterialColors);

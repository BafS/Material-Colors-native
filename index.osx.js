import React, {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Clipboard,
  TouchableOpacity
} from 'react-native-desktop';

import { colors } from './src/colors';

const ColorCircle = ({ name, color, selected }) => {
  return (
    <View style={{
        width: 15,
        height: 15,
        margin: 5,
        opacity: 1 - selected / 1.2,
        borderRadius: 20,
        backgroundColor: color
      }} />
  );
};

const ColorsListPanel = ({ colors, style, onClick, selected }) => {
  return (
    <View style={style}>
    {Object.keys(colors).map((value, index) => {
      let isSelected = value === selected;
      return (
        <TouchableOpacity
          onPress={() => onClick(value)} key={index}>
          <ColorCircle name={value} color={colors[value]['500'].color} selected={isSelected} />
        </TouchableOpacity>
      );
    })}
    </View>
  );
};

const ColorBox = ({ name, color }) => {
  let textColor = '#111';
  let hexStr = color.replace(/^#/, '');
  let lum = parseInt(hexStr[0], 16) + parseInt(hexStr[2], 16) + parseInt(hexStr[4], 16);
  if (lum < 26) {
    textColor = '#fff';
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        margin: 1,
        borderRadius: 2,
        height: 32,
        backgroundColor: color
      }}
      onPress={() => Clipboard.setString(color)}
    >
      <Text style={{
          color: textColor,
          fontSize: 11
        }}>{name.toUpperCase()}</Text>
      <Text style={{
          color: textColor,
          fontSize: 11
        }}>{color}</Text>
    </TouchableOpacity>
  );
};

const ColorsPanel = ({ name, palette, style }) => {
  return (
    <View style={style}>
      <Text style={{
          margin: 8,
          textAlign: 'right',
          fontSize: 11,
          color: '#666'
        }}>{name[0].toUpperCase() + name.slice(1).replace('-', ' ')}</Text>
      {Object.keys(palette).map((value, index) => {
        return <ColorBox key={index} name={value} color={palette[value].color} />;
      })}
    </View>
  );
};

class MaterialColors extends Component {

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
        <ColorsListPanel style={styles.leftPane} colors={colors} selected={this.state.colorName} onClick={this.changeColor} />
        <ColorsPanel style={styles.rightPane} name={this.state.colorName} palette={colors[this.state.colorName]} />
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
    backgroundColor: '#ffffff',
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

import React, {
  Animated,
  Text,
  View,
  Clipboard,
  TouchableOpacity
} from 'react-native-desktop';

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
          fontFamily: 'Monaco',
          color: textColor,
          fontSize: 11
        }}>{color}</Text>
    </TouchableOpacity>
  );
};

export default class ColorsPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0.6)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate() {
    this.animate();
  }

  componentWillReceiveProps() {
    this.setState({
      anim: new Animated.Value(0.6)
    });
  }

  animate() {
    Animated.spring(
      this.state.anim,
      {
        toValue: 1,
        tension: 80,
        friction: 8.5,
      },
    ).start();
  }

  render() {
    const { style, palette, name } = this.props;

    return (
      <View style={style}>
        <Text
          style={{
            margin: 8,
            textAlign: 'right',
            fontSize: 11,
            color: '#666'
          }}>
          {name[0].toUpperCase() + name.slice(1).replace('-', ' ')}
        </Text>
        <Animated.View
          style={{
            opacity: this.state.anim,
            transform: [
              {scaleY: this.state.anim}
            ]
          }}>
          {Object.keys(palette).map((value, index) => {
            return <ColorBox key={index} name={value} color={palette[value].color} />;
          })}
        </Animated.View>
      </View>
    );
  }
}

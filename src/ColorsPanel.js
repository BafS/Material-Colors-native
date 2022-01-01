import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, Clipboard, TouchableOpacity} from 'react-native';

const luminosity = hexStr =>
  parseInt(hexStr[0], 16) + parseInt(hexStr[2], 16) + parseInt(hexStr[4], 16);

const ColorBox = ({name, color}) => {
  const hexStr = color.replace(/^#/, '');
  const textColor = luminosity(hexStr) < 26 ? '#fff' : '#111';

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        margin: 1,
        borderRadius: 2,
        minHeight: 32,
        maxHeight: 64,
        backgroundColor: color,
      }}
      onPress={() => Clipboard.setString(color)}>
      <Text
        style={{
          color: textColor,
          fontSize: 11,
        }}>
        {name.toUpperCase()}
      </Text>
      <Text
        style={{
          fontFamily: 'Monaco',
          color: textColor,
          fontSize: 11,
        }}>
        {color}
      </Text>
    </TouchableOpacity>
  );
};

export default ({style, palette, name}) => {
  const springAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    springAnim.setValue(0.6);

    Animated.spring(springAnim, {
      toValue: 1,
      tension: 80,
      friction: 8.5,
      useNativeDriver: true,
    }).start();
  }, [springAnim, name]);

  return (
    <View style={style}>
      <Animated.View
        style={[
          style,
          {
            opacity: springAnim,
            transform: [{scaleY: springAnim}],
          },
        ]}>
        {Object.keys(palette ?? []).map((value, index) => (
          <ColorBox key={index} name={value} color={palette[value].color} />
        ))}
        <Text
          style={{
            margin: 8,
            textAlign: 'right',
            fontSize: 17,
            color: '#333',
          }}
        />
      </Animated.View>
    </View>
  );
};

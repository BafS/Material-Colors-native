import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Text,
  View,
  Clipboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {getFormater, luminosity} from './utils';

/**
 * @param {{name: string, color: string, formatter: (color: string) => string}} param0
 */
const ColorBox = ({name, color, formatter}) => {
  const hexStr = color.replace(/^#/, '');
  const textColor = luminosity(hexStr) < 26 ? '#fff' : '#111';
  const formatedColor = formatter(hexStr);

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
      onPress={() => Clipboard.setString(formatedColor)}>
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
        {formatedColor}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * @param {{style: any, palette: {[name: string]: {hex: string}}, name: string, colorFormat: string}} param0
 */
export default ({style, palette, name, colorFormat}) => {
  const [isScroll, setIsScroll] = useState(false);
  const springAnim = useRef(new Animated.Value(0)).current;

  const paletteKeys = Object.keys(palette ?? []);

  useEffect(() => {
    springAnim.setValue(0.6);

    Animated.spring(springAnim, {
      toValue: 1,
      tension: 80,
      friction: 8.5,
      useNativeDriver: true,
    }).start();
  }, [springAnim, name]);

  /**
   * @param {import('react-native').LayoutChangeEvent} e
   * @return {float}
   */
  const getColorItemSize = e =>
    e.nativeEvent.layout.height / paletteKeys.length;

  const formatter = getFormater(colorFormat);

  const inner = (
    <Animated.View
      style={[
        style,
        {
          opacity: springAnim,
          transform: [{scaleY: springAnim}],
        },
      ]}>
      {paletteKeys.map((value, index) => (
        <ColorBox
          key={index}
          name={value}
          color={palette[value].hex}
          formatter={formatter}
        />
      ))}
    </Animated.View>
  );

  if (isScroll) {
    return (
      <ScrollView
        style={{flex: 1}}
        onLayout={e => getColorItemSize(e) > 34 && setIsScroll(false)}>
        {inner}
      </ScrollView>
    );
  }

  return (
    <View
      style={{flex: 1}}
      onLayout={e => getColorItemSize(e) < 34 && setIsScroll(true)}>
      {inner}
    </View>
  );
};

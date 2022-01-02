import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const ColorCircle = ({hex: color, selected, onMouseEnter, onMouseLeave}) => (
  <View
    style={{
      // cursor: 'pointer',
      width: 15,
      height: 15,
      borderRadius: 20,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {selected ? (
      <View
        style={{
          width: 23,
          height: 23,
          borderWidth: 2,
          borderColor: color,
          borderRadius: 25,
        }}
      />
    ) : null}
  </View>
);

export default ({colors, style, onClick, selected}) => {
  const getBaseColor = value =>
    colors[value]['500'] ?? Object.values(colors[value])[0];

  const colorsKeys = Object.keys(colors);
  const maxHeight = colorsKeys.length * 30;

  return (
    <View style={{...style, maxHeight}}>
      {colorsKeys.map((value, index) => {
        const isSelected = value === selected;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={() => onClick(value)}>
            <ColorCircle selected={isSelected} {...getBaseColor(value)} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

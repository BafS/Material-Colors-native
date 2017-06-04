import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native-macos';

const ColorCircle = ({ color, selected, onMouseEnter, onMouseLeave }) => {
  return (
    <View
      style={{
        // cursor: 'pointer',
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
       <ColorCircle
         selected={isSelected}
         {...colors[value]['500']} />
       </TouchableOpacity>
     );
   })}
   </View>
 );
};

export default ColorsListPanel;

import React from 'react';
import {Button, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {settingsState} from './atoms';
import {Picker} from '@react-native-picker/picker';
import colors from './colors';

export default ({onDonePress}) => {
  const [settings, setSettings] = useRecoilState(settingsState);

  return (
    <View style={{maxWidth: 400}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 3,
        }}>
        Settings
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 8,
          marginBottom: 6,
          marginLeft: 3,
        }}>
        Color theme
      </Text>
      <Picker
        selectedValue={settings.colorTheme}
        onValueChange={colorTheme => setSettings({...settings, colorTheme})}>
        {Object.entries(colors).map(([key, {name}]) => (
          <Picker.Item label={name} value={key} key={key} />
        ))}
      </Picker>

      <Text
        style={{
          fontSize: 15,
          marginTop: 8,
          marginBottom: 6,
          marginLeft: 3,
        }}>
        Color format
      </Text>
      <Picker
        selectedValue={settings.colorTheme}
        onValueChange={colorFormat => setSettings({...settings, colorFormat})}>
        <Picker.Item label="Hexadecimal (#ab12ef)" value="#hex" />
        <Picker.Item label="Hexadecimal (ab12ef)" value="hex" />
        <Picker.Item label="RGB (171, 18, 239)" value="rgb-simple" />
        <Picker.Item label="RGB (rgb(171, 18, 239))" value="rgb" />
      </Picker>

      <Button title="Done" onPress={onDonePress} />
    </View>
  );
};

import {View, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {Text} from 'react-native';

interface TTextInput extends TextInputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  setText?: (e: string) => void;
}

export default function TTextInput(props: TTextInput) {
  return (
    <View>
      {props.label !== undefined && props.label !== '' && (
        <Text
          style={{
            color: '#191C1D',
          }}>
          {props.label}
        </Text>
      )}
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.setText}
        autoCapitalize="none"
        style={{
          marginTop: 10,
          padding: 20,
          borderWidth: 0.4,
          borderRadius: 10,
        }}
      />
    </View>
  );
}

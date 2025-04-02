import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const TextInputComponent: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#888"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#A52A2A',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color:'#FB562D'
  },
});

export default TextInputComponent;

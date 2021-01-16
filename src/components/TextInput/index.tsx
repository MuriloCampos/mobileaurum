import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';

import { StyledTextInput } from './styles';

interface StyledTextInputProps extends TextInputProps {
  isActive?: boolean;
  width?: number | string;
  height?: number;
  marginBottom?: number;
}

const TextInput: React.FC<StyledTextInputProps> = props => {
  return (
    <StyledTextInput
      style={{ width: props.width, height: props.height }}
      {...props}
    />
  );
};

export default TextInput;

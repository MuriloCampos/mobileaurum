import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';

import { StyledTextInput } from './styles';

interface StyledTextInputProps extends TextInputProps {
  isActive?: boolean;
}

const TextInput: React.FC<StyledTextInputProps> = props => {
  return <StyledTextInput {...props} />;
};

export default TextInput;

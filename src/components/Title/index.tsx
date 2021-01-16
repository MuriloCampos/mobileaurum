import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';

import { StyledText } from './styles';

const Title: React.FC<TextInputProps> = props => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default Title;

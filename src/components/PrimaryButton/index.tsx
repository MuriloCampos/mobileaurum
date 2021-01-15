import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TouchableOpacityProps } from 'react-native';

import { StyledButton, StyledText } from './styles';

interface PrimaryButtonProps extends TouchableOpacityProps {
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = props => {
  return (
    <StyledButton {...props}>
      <StyledText>{props.text}</StyledText>
    </StyledButton>
  );
};

export default PrimaryButton;

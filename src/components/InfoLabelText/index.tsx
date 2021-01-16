import React from 'react';

import { StyledText } from './styles';

const InfoLabelText: React.FC = ({ children }) => {
  return (
    <StyledText>{children}</StyledText>
  );
};

export default InfoLabelText;

import React from 'react';

import { StyledText } from './styles';

const InfoText: React.FC = ({ children }) => {
  return (
    <StyledText>{children}</StyledText>
  );
};

export default InfoText;

import React from 'react';

import { StyledText } from './styles';

const Title: React.FC = ({children}) => {
  return (
    <StyledText>{children}</StyledText>
  );
};

export default Title;

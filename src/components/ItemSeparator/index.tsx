import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ViewProps } from 'react-native';

import { Separator } from './styles';

const ItemSeparator: React.FC<ViewProps> = props => {
  return <Separator {...props} />;
};

export default ItemSeparator;

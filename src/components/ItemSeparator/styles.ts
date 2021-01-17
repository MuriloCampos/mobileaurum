import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import colors from '../../utils/colors';

export const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  width: 100%;
  background-color: ${colors.lightGrey};
`;

import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colors.white};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  elevation: 20;
`;

export const ModalOption = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

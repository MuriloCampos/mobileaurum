import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: ${colors.lightBlue};
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

export const StyledText = styled.Text`
  font-size: 14px;
  color: ${colors.white};
`;

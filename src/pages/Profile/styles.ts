import styled from 'styled-components/native';
import colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const InfoContainer = styled.View`
  flex: 6;
  justify-content: center;
`;

export const SignOutContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${colors.darkGrey};
`;

export const UsernameText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${colors.darkGrey};
`;

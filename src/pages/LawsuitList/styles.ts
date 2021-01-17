import styled from 'styled-components/native';

import colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
`;

export const ItemContainer = styled.TouchableOpacity`
  padding: 20px;
`;

export const LawsuitTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.darkGrey};
  margin-bottom: 5px;
`;

export const NumberLabelText = styled.Text`
  font-size: 12px;
  color: ${colors.lightGrey};
  margin-bottom: 3px;
`;

export const LawsuitNumber = styled.Text`
  font-size: 15px;
  color: ${colors.darkGrey};
`;

export const HeaderContainer = styled.View`
  height: 100px;
  flex-direction: row;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-size: 35px;
  font-weight: 500;
  color: ${colors.darkGrey};
`;

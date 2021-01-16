import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  elevation: 20;
`;

export const ModalOption = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

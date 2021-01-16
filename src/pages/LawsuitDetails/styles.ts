import styled from 'styled-components/native';

export const InfoContainer = styled.View`
  padding: 30px;
`;

export const InfoLineSpacing = styled.View`
  margin-bottom: 10px;
`;

export const HistoricalContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 20px;
`;

export const LeftSideContainer = styled.View`
  width: 15%;
  height: 100%;
  align-items: center;
`;

export const HistoricalDayContainer = styled.View`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: #009ef5;
  align-items: center;
  justify-content: center;
`;

export const HistoricalDayText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`;

export const HistoricalDayLine = styled.View`
  width: 1px;
  height: 100%;
  background-color: #d3d3d3;
`;

export const HistoricalDescriptionContainer = styled.View`
  width: 85%;
`;

export const HistoricalDescriptionText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  text-align: justify;
  line-height: 20px;
`;

export const HistoricalHeaderContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px 30px 0;
`;

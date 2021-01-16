import React, { useMemo } from 'react';
import {
  useRoute,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RouteProp,
} from '@react-navigation/native';
import { FlatList, Text } from 'react-native';
import NumberFormat from 'react-number-format';

import LawsuitInterface from '../../interfaces/Lawsuit';
import Title from '../../components/Title';
import InfoLabelText from '../../components/InfoLabelText';
import InfoText from '../../components/InfoText';
import ItemSeparator from '../../components/ItemSeparator';

import { InfoContainer, InfoLineSpacing } from './styles';

interface Item {
  key: string;
  render: () => JSX.Element;
}

interface LawsuitInfoProps {
  itemData: LawsuitInterface;
}

type RouteParams = {
  data: {
    lawsuitData: LawsuitInterface;
  };
};

const LawsuitDetails: React.FC = () => {
  const routeParams = useRoute<RouteProp<RouteParams, 'data'>>();
  const { lawsuitData } = routeParams.params;

  const LawsuitInfo: React.FC<LawsuitInfoProps> = ({ itemData }) => (
    <InfoContainer>
      <InfoLineSpacing>
        <Title>{itemData.title}</Title>
      </InfoLineSpacing>

      <InfoLineSpacing>
        <InfoLabelText>Número</InfoLabelText>
        <InfoText>{itemData.number}</InfoText>
      </InfoLineSpacing>

      <InfoLineSpacing>
        <InfoLabelText>Cliente</InfoLabelText>
        <InfoText>{itemData.customers[0].name}</InfoText>
      </InfoLineSpacing>

      <InfoLineSpacing>
        <InfoLabelText>Parte</InfoLabelText>
        <InfoText>{itemData.customers[0].roleName}</InfoText>
      </InfoLineSpacing>

      <InfoLineSpacing>
        <InfoLabelText>Fórum</InfoLabelText>
        <InfoText>{itemData.court}</InfoText>
      </InfoLineSpacing>

      <InfoLineSpacing>
        <InfoLabelText>Valor</InfoLabelText>
        <NumberFormat
          value={itemData.amount}
          displayType={'text'}
          thousandSeparator
          prefix={'R$ '}
          renderText={formattedValue => <InfoText>{formattedValue}</InfoText>}
        />
      </InfoLineSpacing>
    </InfoContainer>
  )

  const LawsuitHistoricals: React.FC<LawsuitInfoProps> = ({ itemData }) => (
    <FlatList data={itemData.historicals} keyExtractor={item => item.date} renderItem={({ item }) => (
      <Text>{item.description}</Text>
    )} />
  )

  const { data } = useMemo(() => {
    const items: Item[] = [
      {
        key: 'LAWSUIT_INFO',
        render: () => <LawsuitInfo itemData={lawsuitData} />
      },
      {
        key: 'LAWSUIT_HISTORICAL',
        render: () => <LawsuitHistoricals itemData={lawsuitData} />
      }
    ]

    return {
      data: items
    }
  }, [])

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.key}
      renderItem={({ item }) => item.render()}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default LawsuitDetails;

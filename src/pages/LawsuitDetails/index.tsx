import React, { useState, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';
import { format, getYear, parseISO, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import LawsuitInterface from '../../interfaces/Lawsuit';
import HistoricalInterface from '../../interfaces/Historical';
import Title from '../../components/Title';
import InfoLabelText from '../../components/InfoLabelText';
import InfoText from '../../components/InfoText';
import ItemSeparator from '../../components/ItemSeparator';
import OrderByModal from '../../components/OrderByModal';

import {
  HistoricalContainer,
  InfoContainer,
  InfoLineSpacing,
  LeftSideContainer,
  HistoricalDayContainer,
  HistoricalDayText,
  HistoricalDayLine,
  HistoricalDescriptionContainer,
  HistoricalDescriptionText,
  HistoricalHeaderContainer,
  OrderOptions,
} from './styles';

interface Item {
  key: string;
  render: () => JSX.Element;
}

interface LawsuitInfoProps {
  itemData: LawsuitInterface;
}

interface LawsuitHistoricalItemProps {
  itemData: HistoricalInterface;
}

type RouteParams = {
  data: {
    lawsuitData: LawsuitInterface;
  };
};

const LawsuitDetails: React.FC = () => {
  const routeParams = useRoute<RouteProp<RouteParams, 'data'>>();
  const { lawsuitData } = routeParams.params;
  const [orderedData, setOrderedData] = useState<LawsuitInterface>(lawsuitData);
  const [sort, setSort] = useState<'date' | 'description'>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderByModalVisible, setOrderByModalVisible] = useState(false);

  useEffect(() => {
    if (sort === 'date') {
      setOrderedData(current => {
        const newData = current;
        const orderedHistoricals =
          order === 'desc'
            ? newData.historicals.sort((item, nextItem) =>
                isBefore(parseISO(item.date), parseISO(nextItem.date)) ? 1 : -1
              )
            : newData.historicals.sort((item, nextItem) =>
                isBefore(parseISO(nextItem.date), parseISO(item.date)) ? 1 : -1
              );

        newData.historicals = orderedHistoricals;

        return newData;
      });
    } else {
      setOrderedData(current => {
        const newData = current;
        const orderedHistoricals =
          order === 'desc'
            ? newData.historicals.sort((item, nextItem) =>
                item.description < nextItem.description ? 1 : -1
              )
            : newData.historicals.sort((item, nextItem) =>
                nextItem.description < item.description ? 1 : -1
              );

        newData.historicals = orderedHistoricals;

        return newData;
      });
    }
  }, [sort, order]);

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
  );

  const LawsuitHistoricalItem: React.FC<LawsuitHistoricalItemProps> = ({
    itemData,
  }) => {
    const itemDate = parseISO(itemData.date);
    const itemDay = format(itemDate, 'dd');
    const itemMonth = format(itemDate, 'MMMM', { locale: pt });
    const itemYear = getYear(itemDate);

    return (
      <HistoricalContainer>
        <LeftSideContainer>
          <HistoricalDayContainer>
            <HistoricalDayText>{itemDay}</HistoricalDayText>
          </HistoricalDayContainer>
          <HistoricalDayLine />
        </LeftSideContainer>

        <HistoricalDescriptionContainer>
          <InfoLineSpacing>
            <Title style={styles.title}>{itemMonth}</Title>
            <InfoLabelText>{itemYear}</InfoLabelText>
          </InfoLineSpacing>

          <HistoricalDescriptionText>
            {itemData.description}
          </HistoricalDescriptionText>
        </HistoricalDescriptionContainer>
      </HistoricalContainer>
    );
  };

  const LawsuitHistoricalHeader = () => (
    <HistoricalHeaderContainer>
      <Title>HISTÓRICO</Title>
      <OrderOptions onPress={() => setOrderByModalVisible(true)}>
        <InfoText>
          {sort === 'date' ? 'Ordernar por data' : 'Ordenar por descrição'}
        </InfoText>
        <Icon style={styles.icon} name="arrow-drop-down" size={20} />
        <FaIcon name={`sort-amount-${order}`} size={15} />
      </OrderOptions>
    </HistoricalHeaderContainer>
  );

  const LawsuitHistoricals: React.FC<LawsuitInfoProps> = ({ itemData }) => (
    <FlatList
      data={itemData.historicals}
      keyExtractor={item => item.date}
      renderItem={({ item }) => <LawsuitHistoricalItem itemData={item} />}
      ListHeaderComponent={<LawsuitHistoricalHeader />}
    />
  );

  const data = [
    {
      key: 'LAWSUIT_INFO',
      render: () => <LawsuitInfo itemData={orderedData} />,
    },
    {
      key: 'LAWSUIT_HISTORICAL',
      render: () => <LawsuitHistoricals itemData={orderedData} />,
    },
  ];

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => item.render()}
        ItemSeparatorComponent={ItemSeparator}
      />
      <OrderByModal
        modalVisible={orderByModalVisible}
        setModalVisible={setOrderByModalVisible}
        order={order}
        setOrder={setOrder}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
    marginRight: 10,
  },
  title: {
    textTransform: 'capitalize',
  },
});

export default LawsuitDetails;

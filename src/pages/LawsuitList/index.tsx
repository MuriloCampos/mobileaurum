import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import ShimmerView from 'react-native-shimmer';

import useLawsuits from '../../hooks/useLawsuits';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import LawsuitInterface from '../../interfaces/Lawsuit';
import TextInput from '../../components/TextInput';
import Title from '../../components/Title';
import InfoLabelText from '../../components/InfoLabelText';
import InfoText from '../../components/InfoText';
import ItemSeparator from '../../components/ItemSeparator';
import Shimmer from './LawsuitItemShimmer';
import colors from '../../utils/colors';

import {
  Container,
  ItemContainer,
  HeaderContainer,
  HeaderTitle,
} from './styles';

interface LawsuitItemProps {
  item: LawsuitInterface;
}

const LawsuitList: React.FC = () => {
  const [filteredData, setFilteredData] = useState<LawsuitInterface[]>([]);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation();
  const { data: lawsuits, isLoading, refetch, isFetching } = useLawsuits();

  useEffect(() => {
    if (search !== '' && lawsuits) {
      const filtered = lawsuits.cases.filter(str => {
        return (
          str.title.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
          str.number.indexOf(search) !== -1
        );
      });

      setFilteredData(filtered);
    }
  }, [search, lawsuits]);

  const ListHeaderComponent = useCallback(
    () => (
      <HeaderContainer>
        {isSearching ? (
          <TextInput
            placeholder="Pesquisar"
            onChangeText={newValue => setSearch(newValue)}
            width="85%"
          />
        ) : (
          <HeaderTitle>Processos</HeaderTitle>
        )}
        <TouchableOpacity
          onPress={() => {
            setIsSearching(current => {
              if (current) {
                setSearch('');
              }

              return !current;
            });
          }}
        >
          <Icon
            name={isSearching ? 'close' : 'search'}
            color={colors.lightBlue}
            size={40}
          />
        </TouchableOpacity>
      </HeaderContainer>
    ),
    [isSearching]
  );

  const LawsuitItem: React.FC<LawsuitItemProps> = ({ item }) => (
    <ItemContainer
      onPress={() =>
        navigation.navigate('lawsuit_details', { lawsuitData: item })
      }
    >
      <Title>{item.title}</Title>
      <InfoLabelText>Número</InfoLabelText>
      <InfoText>{item.number}</InfoText>
    </ItemContainer>
  );

  return (
    <Container>
      {isLoading || !lawsuits || isFetching ? (
        <>
          <ShimmerView style={styles.headerShimmerContainer}>
            <View style={styles.headerShimmerView} />
          </ShimmerView>
          {[0, 1, 2, 3, 4, 5, 6].map(item => (
            <Shimmer key={item} />
          ))}
        </>
      ) : (
        <FlatList
          data={search !== '' && isSearching ? filteredData : lawsuits.cases}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <LawsuitItem item={item} />}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={<ListHeaderComponent />}
          onRefresh={refetch}
          refreshing={isFetching}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Title style={styles.noLawsuitsText}>
              Nenhum processo encontrado
            </Title>
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  headerShimmerContainer: {
    margin: 20,
  },
  headerShimmerView: {
    height: 50,
    marginBottom: 30,
    backgroundColor: colors.lightGrey,
  },
  noLawsuitsText: {
    textAlign: 'center',
  },
});

export default LawsuitList;

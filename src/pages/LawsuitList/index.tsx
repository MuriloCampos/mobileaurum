import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from 'react-hook-form';

// import useLawsuits from '../../hooks/useLawsuits';
import LawsuitInterface from '../../interfaces/Lawsuit';
import TextInput from '../../components/TextInput';

import {
  Container,
  ItemContainer,
  LawsuitTitle,
  NumberLabelText,
  LawsuitNumber,
  ItemSeparator,
  HeaderContainer,
  HeaderTitle,
  SearchContainer,
} from './styles';

interface LawsuitItemProps {
  item: LawsuitInterface;
}

interface ListHeaderComponentProps {
  query: string;
  setQuery(newQuery: string): void;
}

const data = {
  cases: [
    {
      id: '1',
      type: 'CTE_CASE',
      number: '0000905-40.2014.8.02.0080',
      file: 'p1',
      customers: [
        {
          name: 'CRISTOVÃO JACKSON DE LINS WANDERLEY',
          roleName: 'Demandante',
        },
      ],
      title: 'CRISTOVÃO JACKSON DE LINS WANDERLEY',
      court:
        '11º Juizado Especial Cível da Capital - 11º Juizado Especial Cível da Capital',
      lawsuitType: 'Rescisão do contrato e devolução do dinheiro',
      amount: 10000,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
      ],
      active: true,
    },
    {
      id: '2',
      type: 'CTE_LAWSUIT',
      number: '0056311-85.2012.8.26.0100',
      file: 'p5',
      customers: [
        {
          name: 'CYBELE DUARTE',
          roleName: 'Inventariante',
        },
      ],
      title: 'CYBELE DUARTE',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description:
            'Não Concedida a Antecipação de tutela\nDECIDO. Tratando-se de medida preventiva a solicitada pelo autor, é se evidenciar satisfeito o pleito de verossimilhança do direito invocado quando o mesmo não apenas exibe leis e jurisprudência em favor de sua tese mas, ainda, o perigo na demora em se aguardar a instrução do feito para que alguma medida seja adotada a respeito. No caso isso seria feito caso o autor tivesse tido o cuidado de evidenciar, cabalmente, que vem sofrendo com punições indevidas por parte da AGERBA. No relato inicial é feita referência a uma autuação contra um dos cooperados da autora. Nos autos, no entanto, não se encontrou nem a cópia desse autor e nem a prova de que o autuado seja, de fato, cooperado da autora. Sendo assim, me parece evidente que não há verossimilhança no direito invocado, de modo que não se pode aferir, de fato, a necessidade de tutela judicial antecipatória para garantir-se a permanência de uma atividade de fretamento que, até prova em contrário, não está sofrendo nenhum tipo de impedimento por parte da autoridade ré - declaração essa feita tendo em vista que os atos administrativos têm presunção de legitimidade e que o contrário carece de prova. Por todo o exposto é que NEGO o pedido de tutela antecipada formulada na inicial. Cite-se o réu para, querendo, oferecer defesa, em 60 dias. I.',
        },
      ],
    },
    {
      id: '3',
      type: 'CTE_LAWSUIT',
      number: '1089410-58.2014.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'CYNTHIA LACERDA TORRANO DE ALMEIDA',
          roleName: 'Inventariante',
        },
      ],
      title: 'CYNTHIA LACERDA TORRANO DE ALMEIDA',
      court: '12ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000653.28,
      active: true,
      isAutomatic: true,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description:
            'Juntada de Petição\nNº Protocolo: WEB1.14.01152050-0\r\nTipo da Petição: Juntada de DAJE(s)\r\nData: 24/09/2014 21:01',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
      ],
    },
    {
      id: '4',
      type: 'CTE_CASE',
      number: '1064014-40.2018.8.26.0100',
      file: 'p5',
      customers: [
        {
          name: 'Caio Marcelo Gregolin Sampaio',
          roleName: 'Advogado',
        },
      ],
      title: 'Caio Marcelo Gregolin Sampaio',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description:
            'Publicado\nRelação :0263/2014\r\nData da Disponibilização: 22/09/2014\r\nData da Publicação: 23/09/2014\r\nNúmero do Diário: 1279',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Arquivado Provisoriamente',
        },
      ],
      isAutomatic: true,
    },
    {
      id: '5',
      type: 'CTE_LAWSUIT',
      number: '1039759-04.2014.8.26.0053',
      file: 'p3',
      customers: [
        {
          name: 'Camila de Almeida Capelini',
          roleName: 'Impetrante',
        },
      ],
      title: 'Camila de Almeida Capelini',
      court:
        '12ª Vara de Fazenda Pública - Foro Central - Fazenda Pública/Acidentes',
      lawsuitType: 'Posse e Exercício',
      amount: 1000,
      active: true,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
      ],
      isAutomatic: true,
    },
    {
      id: '7',
      type: 'CTE_LAWSUIT',
      number: '1106969-86.2018.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'Camila dos Santos Ybars',
          roleName: 'Requerente',
        },
      ],
      customerId: '5130732162777088',
      title: 'Camila dos Santos Ybars',
      court: '7ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '8',
      type: 'CTE_LAWSUIT',
      number: '0035417-59.2010.8.26.0100',
      customers: [
        {
          name: 'Carina Menato Ferlin',
          roleName: 'Requerente',
        },
      ],
      title: 'Carina Menato Ferlin',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 12000,
      historicals: [
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
        {
          date: '2017-11-30T03:00:00.000Z',
          description: 'Concluso para despacho',
        },
      ],
      active: true,
    },
    {
      id: '9',
      type: 'CTE_LAWSUIT',
      number: '1117255-94.2016.8.26.0100',
      file: 'p3',
      customers: [
        {
          name: 'Carina da Silva Pedreiro Pinto',
          roleName: 'Inventariante',
        },
      ],
      title: 'Carina da Silva Pedreiro Pinto',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '10',
      type: 'CTE_LAWSUIT',
      number: '0306443-70.2009.8.26.0100',
      file: 'p5',
      customers: [
        {
          name: 'Carla Fernanda Lotufo',
          roleName: 'Herdeiro',
        },
      ],
      title: 'Carla Fernanda Lotufo',
      court: '',
      lawsuitType: 'Inventário e Partilha',
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '11',
      type: 'CTE_LAWSUIT',
      number: '0014769-87.2012',
      customers: [
        {
          name: 'Carlos',
          roleName: 'Autor',
        },
      ],
      title: 'Carlos -processo',
      court: '',
      active: true,
      historicals: [],
      isAutomatic: false,
    },
    {
      id: '12',
      type: 'CTE_LAWSUIT',
      number: '1001717-48.2019.8.26.0007',
      file: 'p2',
      customers: [
        {
          name: 'Carlos Alberto Santana',
          roleName: 'Requerente',
        },
      ],
      title: 'Carlos Alberto Santana',
      court: '3ª Vara Cível - Foro Regional IX - Vila Prudente',
      lawsuitType: 'Despejo por Denúncia Vazia',
      amount: 9600,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '13',
      type: 'CTE_LAWSUIT',
      number: '1007337-18.2017.8.26.0005',
      file: 'p1',
      customers: [
        {
          name: 'Carlos Augusto Murzin Monteiro',
          roleName: 'Inventariante',
        },
      ],
      customerId: '6747930090274816',
      title: 'Carlos Augusto Murzin Monteiro',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 101789,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '14',
      type: 'CTE_LAWSUIT',
      number: '0713994-49.2012.8.04.0001',
      file: 'p3',
      customer: 'Carlos Balanco de Castro',
      customers: [
        {
          name: 'Carlos Balanco de Castro',
          roleName: 'Requerente',
        },
      ],
      customerId: '4754369025146880',
      title: 'Carlos Balanco de Castro',
      court:
        '3ª Vara Cível e de Acidentes de Trabalho - Capital - Fórum Ministro Henoch Reis',
      lawsuitType: 'Acidente de Trânsito',
      amount: 36759,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '15',
      type: 'CTE_LAWSUIT',
      number: '0113075-53.2010.8.05.0001',
      file: 'p2',
      customers: [
        {
          name: 'Carlos Cesar Pereira dos Santos',
          roleName: 'Autor',
        },
      ],
      title: 'Carlos Cesar Pereira dos Santos x Banco do Brasil Sa',
      court: '3ª Vara Cível e Comercial - Salvador',
      lawsuitType: 'Contratos de Consumo',
      distribuitionDate: 'Tue Dec 07 00:00:00 UTC 2010',
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '16',
      type: 'CTE_LAWSUIT',
      number: '0328971-98.2009.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'Carlos Fernando Anastacio',
          roleName: 'Inventariante',
        },
      ],
      title: 'Carlos Fernando Anastacio',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '17',
      type: 'CTE_LAWSUIT',
      number: '1046226-18.2015.8.26.0100',
      file: 'p2',
      customers: [
        {
          name: 'Carlos Fernando Parrulli Oetterer',
          roleName: 'Requerente',
        },
      ],
      title: 'Carlos Fernando Parrulli Oetterer',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 138681.08,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '18',
      type: 'CTE_LAWSUIT',
      number: '1014314-95.2018.8.26.0003',
      file: 'p3',
      customers: [
        {
          name: 'Carlos Garcia Lerma',
          roleName: 'Requerente',
        },
      ],
      title: 'Carlos Garcia Lerma',
      court: '11ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 10000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '19',
      type: 'CTE_CASE',
      number: '0210050-67.2010.8.04.0001',
      file: 'p2',
      customers: [
        {
          name: 'Carlos Sérgio dos Santos Pinheiro',
          roleName: 'Requerente',
        },
      ],
      customerId: '6033473141735424',
      title: 'Carlos Sérgio dos Santos Pinheiro',
      court:
        'Vara de Órfãos e Sucessões - Capital - Fórum Ministro Henoch Reis',
      lawsuitType: 'Inventário e Partilha',
      amount: 70000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '20',
      type: 'CTE_LAWSUIT',
      number: '1004957-91.2018.8.26.0003',
      file: 'p1',
      customer: 'Carlota Henriques das Neves',
      customers: [
        {
          name: 'Carlota Henriques das Neves',
          roleName: 'Inventariante',
        },
      ],
      title: 'Carlota Henriques das Neves',
      court: '4ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 2992748.6,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '21',
      type: 'CTE_LAWSUIT',
      number: '1085354-74.2017.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'Carmen Lia de Souza Pinto',
          roleName: 'Requerente',
        },
      ],
      title: 'Carmen Lia de Souza Pinto',
      court: '1ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '22',
      type: 'CTE_CASE',
      number: '0802815-60.2019.8.12.0001',
      file: 'p3',
      customers: [
        {
          name: 'Carolina Alves de Oliveira Dolzan',
          roleName: 'Embargante',
        },
      ],
      title: 'Carolina Alves de Oliveira Dolzan',
      court:
        '1ª Vara de Direitos Difusos, Coletivos e Individuais Homogêneos - Campo Grande',
      lawsuitType: 'Efeito Suspensivo / Impugnação / Embargos à Execução',
      amount: 742882,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '23',
      type: 'CTE_CASE',
      number: '0314655-03.2011.8.05.0001',
      file: 'p1',
      customers: [
        {
          name: 'Carolina Leal Spínola Costa',
          roleName: 'Autor',
        },
      ],
      title: 'Carolina Leal Spínola Costa',
      court: '2ª Vara Empresarial - Salvador',
      lawsuitType: 'Pagamento em Consignação',
      distribuitionDate: 'Fri Nov 18 00:00:00 UTC 2011',
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '24',
      type: 'CTE_LAWSUIT',
      number: '0033975-87.2012.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'Caroline Alves Moreira da Silva',
          roleName: 'Inventariante',
        },
      ],
      title: 'Caroline Alves Moreira da Silva',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 10000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '25',
      type: 'CTE_LAWSUIT',
      number: '1009051-44.2016.8.26.0006',
      file: 'p2',
      customers: [
        {
          name: 'Caroline Miranda Tampallini',
          roleName: 'Requerente',
        },
      ],
      title: 'Caroline Miranda Tampallini',
      court:
        '1ª Vara do Juizado Especial Cível - Foro Regional VI - Penha de França',
      lawsuitType: 'Responsabilidade Civil',
      amount: 35200,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '26',
      type: 'CTE_LAWSUIT',
      number: '1009051-44.2016.8.26.0006',
      file: 'p3',
      customers: [
        {
          name: 'Caroline Miranda Tampallini',
          roleName: 'Requerente',
        },
      ],
      title: 'Caroline Miranda Tampallini',
      court:
        '1ª Vara do Juizado Especial Cível - Foro Regional VI - Penha de França',
      lawsuitType: 'Responsabilidade Civil',
      amount: 35200,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '27',
      type: 'CTE_LAWSUIT',
      number: '0015011-90.2012.8.26.0053',
      file: 'p3',
      customer: 'Casa Natacci Distribuidora de Auto Peças Ltda',
      customers: [
        {
          name: 'Casa Natacci Distribuidora de Auto Peças Ltda',
          roleName: 'Requerente',
        },
      ],
      customerId: '4714083123200000',
      title: 'Casa Natacci Distribuidora de Auto Peças Ltda',
      court:
        '3ª Vara de Fazenda Pública - Foro Central - Fazenda Pública/Acidentes',
      lawsuitType: 'Anulação de Débito Fiscal',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '28',
      type: 'CTE_LAWSUIT',
      number: '1068436-97.2014.8.26.0100',
      file: 'p1',
      customers: [
        {
          name: 'Catarina Maria de Carvalho E Silva',
          roleName: 'Requerente',
        },
      ],
      customerId: '6606205195649024',
      title: 'Catarina Maria VS Estado de Cuiabá',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '29',
      type: 'CTE_LAWSUIT',
      number: '1011052-79.2014.8.26.0003',
      file: 'p3',
      customers: [
        {
          name: 'Cecília Mituye Kusano',
          roleName: 'Requerente',
        },
      ],
      title: 'Cecília Mituye Kusano',
      court: '4ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 453337,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '30',
      type: 'CTE_LAWSUIT',
      number: '1129860-09.2015.8.26.0100',
      file: 'p3',
      customers: [
        {
          name: 'Celeste Ainda Hugliano dos Santos',
          roleName: 'Requerente',
        },
      ],
      title: 'Celeste Ainda Hugliano dos Santos',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'DIREITO CIVIL',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
    {
      id: '31',
      type: 'CTE_LAWSUIT',
      number: '1032639-21.2018.8.26.0100',
      file: 'p3',
      customers: [
        {
          name: 'Celia Maria Ferrari Arantes',
          roleName: 'Inventariante',
        },
      ],
      title: 'Celia Maria Ferrari Arantes',
      court: '2ª Vara da Família e Sucessões - Foro Central Cível',
      lawsuitType: 'Inventário e Partilha',
      amount: 1000,
      active: true,
      historicals: [],
      isAutomatic: true,
    },
  ],
};

const lawsuits: LawsuitInterface[] = data.cases;

const LawsuitList: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [filteredData, setFilteredData] = useState<LawsuitInterface[]>([]);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const onSubmit = formData => {
    console.log('chamou');
    setSearch(formData.search);
  };

  useEffect(() => {
    console.log(search);
    if (search !== '') {
      const filtered = lawsuits.filter(str => {
        return str.title.toUpperCase().indexOf(search.toUpperCase()) !== -1;
      });

      setFilteredData(filtered);
    }
  }, [search]);

  // const { data } = useLawsuits();

  // useEffect(() => {
  //   if (data) {
  //     console.log(JSON.stringify(data.cases, null, 2));
  //   }
  // }, [data]);

  const ListHeaderComponent = () => (
    <HeaderContainer>
      {isSearching ? (
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Pesquisar"
              onBlur={onBlur}
              onChangeText={newValue => onChange(newValue)}
              onSubmitEditing={handleSubmit(onSubmit)}
              value={value}
              width="85%"
            />
          )}
          name="search"
          defaultValue=""
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
          color="#009ef5"
          size={40}
        />
      </TouchableOpacity>
    </HeaderContainer>
  );

  const LawsuitItem: React.FC<LawsuitItemProps> = ({ item }) => (
    <ItemContainer>
      <LawsuitTitle>{item.title}</LawsuitTitle>
      <NumberLabelText>Número</NumberLabelText>
      <LawsuitNumber>{item.number}</LawsuitNumber>
    </ItemContainer>
  );

  return (
    <Container>
      <FlatList
        data={search !== '' && isSearching ? filteredData : lawsuits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <LawsuitItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<ListHeaderComponent />}
      />
    </Container>
  );
};

export default LawsuitList;

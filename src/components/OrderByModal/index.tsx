import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Title from '../Title';
import colors from '../../utils/colors';
import Separator from '../ItemSeparator';

import { Container, ModalOption } from './styles';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible(visible: boolean): void;
  order: 'asc' | 'desc';
  setOrder(newOder: 'asc' | 'desc'): void;
  sort: 'date' | 'description';
  setSort(newSort: 'date' | 'description'): void;
}

const OrderByModal: React.FC<ModalProps> = props => {
  const {
    modalVisible,
    setModalVisible,
    order,
    setOrder,
    sort,
    setSort,
  } = props;

  const handleSortChange = (newSort: 'date' | 'description') => {
    setSort(newSort);
  };

  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    setOrder(newOrder);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={modalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection="down"
      onSwipeComplete={() => setModalVisible(false)}
      backdropTransitionOutTiming={0}
      onBackButtonPress={() => setModalVisible(false)}
      backdropOpacity={0.8}
      backdropColor={colors.white}
    >
      <Container>
        <ModalOption onPress={() => handleSortChange('date')}>
          <Icon
            name="done"
            size={25}
            color={sort === 'date' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Title>Ordernar por data</Title>
        </ModalOption>
        <ModalOption onPress={() => handleSortChange('description')}>
          <Icon
            name="done"
            size={25}
            color={sort === 'description' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Title>Ordernar por descrição</Title>
        </ModalOption>

        <Separator style={styles.separator} />

        <ModalOption onPress={() => handleOrderChange('asc')}>
          <Icon
            name="done"
            size={25}
            color={order === 'asc' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Title>Crescente</Title>
        </ModalOption>
        <ModalOption onPress={() => handleOrderChange('desc')}>
          <Icon
            name="done"
            size={25}
            color={order === 'desc' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Title>Decrescente</Title>
        </ModalOption>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  check: {
    marginRight: 15,
  },
  separator: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default OrderByModal;

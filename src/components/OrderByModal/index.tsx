import React from 'react';
import Modal from 'react-native-modal';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <Text>Ordernar por data</Text>
        </ModalOption>
        <ModalOption onPress={() => handleSortChange('description')}>
          <Icon
            name="done"
            size={25}
            color={sort === 'description' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Text>Ordernar por descrição</Text>
        </ModalOption>

        <Separator />

        <ModalOption onPress={() => handleOrderChange('asc')}>
          <Icon
            name="done"
            size={25}
            color={order === 'asc' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Text>Crescente</Text>
        </ModalOption>
        <ModalOption onPress={() => handleOrderChange('desc')}>
          <Icon
            name="done"
            size={25}
            color={order === 'desc' ? colors.lightBlue : colors.white}
            style={styles.check}
          />
          <Text>Decrescente</Text>
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
});

export default OrderByModal;

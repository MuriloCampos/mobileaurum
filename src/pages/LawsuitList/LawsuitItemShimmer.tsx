import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerView from 'react-native-shimmer';

import colors from '../../utils/colors';

const LawsuitItemShimmer: React.FC = () => {
  return (
    <View style={styles.container}>
      <ShimmerView style={styles.shimmer}>
        <View style={styles.view} />
      </ShimmerView>
      <ShimmerView style={styles.labelShimmer}>
        <View style={styles.labelView} />
      </ShimmerView>
      <ShimmerView style={styles.shimmer}>
        <View style={styles.view} />
      </ShimmerView>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    marginBottom: 5,
  },
  labelShimmer: {
    marginBottom: 3,
    width: 50,
  },
  view: {
    height: 20,
    backgroundColor: colors.lightGrey,
  },
  labelView: {
    height: 20,
    backgroundColor: colors.lightGrey,
  },
  container: {
    padding: 20,
  },
});

export default LawsuitItemShimmer;

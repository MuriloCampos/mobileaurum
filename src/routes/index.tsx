import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.IndicatorContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user.logged_in ? <AppRoutes /> : <AuthRoutes />;
};

const styles = StyleSheet.create({
  IndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Routes;

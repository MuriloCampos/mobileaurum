import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LawsuitList from '../pages/LawsuitList';
import Profile from '../pages/Profile';

const AppNavigation = createBottomTabNavigator();
// const LawsuitsStack = createStackNavigator();

const routes: React.FC = () => {
  return (
    <AppNavigation.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#484f57',
        inactiveBackgroundColor: '#484f57',
        activeTintColor: '#009ef5',
        labelPosition: 'beside-icon',
      }}
    >
      <AppNavigation.Screen
        name="lawsuits"
        component={LawsuitList}
        options={{
          tabBarLabel: 'PROCESSOS',
          tabBarIcon: ({ color, size }) => (
            <Icon name="folder" color={color} size={size} />
          ),
        }}
      />
      <AppNavigation.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'PERFIL',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </AppNavigation.Navigator>
  );
};

export default routes;

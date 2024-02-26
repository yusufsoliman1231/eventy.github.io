import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SendMessagesRequest from './SendMessagesRequest';
import ReceivedMessagesRequest from './ReceivedMessagesRequest';
import {useTranslation} from 'react-i18next';

function HeaderTabs(): JSX.Element {
  const Tab = createMaterialTopTabNavigator();
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <Tab.Navigator
        initialRouteName="ChatMessages"
        screenOptions={{
          tabBarActiveTintColor: '#111',
          tabBarLabelStyle: {fontSize: 12, fontFamily: 'Poppins-Bold'},
          tabBarStyle: {
            marginBottom: 10,
            backgroundColor: 'lightgray',
            marginHorizontal: 6,
            borderRadius: 8,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
            padding: Platform.OS === 'ios' || Platform.OS === 'web' ? 22 : 23,
            borderRadius: 10,
            marginBottom: 2,
          },
        }}>
        <Tab.Screen
          name="ReceivedMessagesRequest"
          component={ReceivedMessagesRequest}
          options={{
            tabBarLabel: t('messageRequests'),
          }}
        />
        <Tab.Screen
          name="SendMessagesRequest"
          component={SendMessagesRequest}
          options={{tabBarLabel: t('messagesSent')}}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
export default HeaderTabs;

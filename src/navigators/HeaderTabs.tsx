import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParamList} from './RootStack';
import {StackScreenProps} from '@react-navigation/stack';
import ChatMessagesScreen from '../components/ChatComponent/ChatMessagesScreen';
import ChatRequestMessagesScreen from '../components/ChatComponent/ChatRequestMessagesScreen';
import SearchScreen from '../screens/SearchScreen';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();
type Props = StackScreenProps<RootStackParamList, 'QrScreen' | 'HeaderTabs'>;

function HeaderTabs(): JSX.Element {
  const {t} = useTranslation();

  return (
    <KeyboardAvoidingView
      style={{flex: 1, direction: 'ltr'}}
      behavior="padding">
      <SearchScreen />
      <Tab.Navigator
        initialRouteName="ChatMessages"
        screenOptions={{
          tabBarActiveTintColor: '#111',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Poppins-Bold',
          },
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
        <>
          <Tab.Screen
            name="ChatRequestMessages"
            component={ChatRequestMessagesScreen}
            options={{tabBarLabel: t('requests')}}
          />
          <Tab.Screen
            name="ChatMessages"
            component={ChatMessagesScreen}
            options={{
              tabBarLabel: t('messages'),
            }}
          />
        </>
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
export default HeaderTabs;

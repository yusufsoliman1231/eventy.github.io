import React, {FC, useEffect, useState} from 'react';
// react navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CardProps} from '../components/Cards/types';
import {useAuth} from '../hooks/AuthProvider';
import BottomBarTabs from './BottomTabBar';
import * as Linking from 'expo-linking';
import Error from '../screens/Error';
import {DefaultTheme} from 'react-native-paper';
import NoDataUrl from '../components/NoDataUrl/NoDataUrl';
import OutsideStack from './OutSideStack';
import useNotifications from '../hooks/useNotifications';
import {useGetEventUserChats} from '../services/react-query-hooks/get-event-user-chats';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {ActivityIndicator, Text, View} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';

// types
export type RootStackParamList = {
  Home: undefined;
  HomeScreen: undefined;
  Balance: CardProps;
  EventName: undefined;
  Speakers: undefined;
  SignIn: undefined;
  FloorPlan: undefined;
  Exhibitors: undefined;
  Agenda: undefined;
  Messages: undefined;
  Profile: undefined;
  Network: undefined;
  Account: undefined;
  ChatScreen: undefined;
  MessagesScreen: undefined;
  QrScreen: undefined;
  HeaderTabs: undefined;
  UserProfileScreen: undefined;
  ProfileScreen: undefined;
  SearchScreen: undefined;
  QrGenerator: undefined;
  NetworkScreen: undefined;
  ResetPassword: undefined;
  ChatRequestMessagesScreen: undefined;
  Error: undefined;
  NoDataUrl: undefined;
  OutsideStack: undefined;
  MeetingScreen: undefined;
  UserMeetingsView: undefined;
};

TODO: 'we should ask the user that if you dont have any event or if you want to change the login Credentials press here';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      ChatScreen: {
        path: 'chatScreen',
      },
    },
  },
};

const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = props => {
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);
  const [navigationState, setNavigationState] =
    useMMKVString('navigationState');
  const {user} = useAuth();
  const [theme, setTheme] = useState<any>(DefaultTheme);
  const [localStorageToken, setLocalStorageToken]: any = useAsyncStorage(
    'token',
    '',
  );
  const {urlProps}: any = props;
  const {data, isLoading, isError, refetch} = useGetEventUserChats();

  // HANDLE THE BOTTOM TABS NOTIFICATIONS
  const bottomNotifications = data?.reduce(
    (total: any, item: {attributes: {unseen_messages_count: any}}) => {
      return total + (item.attributes?.unseen_messages_count || 0);
    },
    0,
  );

  const {
    lastMessage,
    sendMessage,
    readyState,
    notification,
    seenNotificationsHook,
  } = useNotifications();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = navigationState;
        const state = JSON.parse(savedStateString || 'null');
        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady, navigationState]);

  useEffect(() => {
    if (seenNotificationsHook) {
      localStorageToken && refetch();
    }
  }, [seenNotificationsHook, localStorageToken]);

  return (
    <NavigationContainer
      // fallback={
      //   <View className="flex-1 items-center justify-center">
      //     <ActivityIndicator animating={true} size="large" color="#d45d5d" />
      //   </View>
      // }
      initialState={initialState}
      onStateChange={state => setNavigationState(JSON.stringify(state))}
      linking={linking}>
      {!urlProps ? (
        <NoDataUrl />
      ) : !user?.access_token && urlProps ? (
        <OutsideStack />
      ) : (
        <BottomBarTabs
          //@ts-ignore
          notification={notification}
          bottomNotifications={bottomNotifications}
        />
      )}
      {/* <BottomBarTabs /> */}
      {/* <OutsideStack /> */}
    </NavigationContainer>
  );
};

export default RootStack;

function ErrorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Error" component={Error} />
    </Stack.Navigator>
  );
}

function NoDataUrls() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NoDataUrl" component={NoDataUrl} />
    </Stack.Navigator>
  );
}

// {subDomain !== undefined ? (
//   !user.access_token ? (
//     <OutsideStack />
//   ) : (
//     <BottomBarTabs />
//   )
// ) : (
//   <ErrorStack />
// )}

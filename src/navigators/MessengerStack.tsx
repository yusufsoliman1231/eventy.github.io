import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStack';
import HeaderTabs from './HeaderTabs';
import ChatScreen from '../screens/ChatScreen';
import QrScreen from '../screens/QrScaanScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import OutsideStack from './OutSideStack';

const Stack = createStackNavigator<RootStackParamList>();

function MessengerStack(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MessagesScreen" component={HeaderTabs} />
      <Stack.Screen name="QrScreen" component={QrScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default MessengerStack;
1;

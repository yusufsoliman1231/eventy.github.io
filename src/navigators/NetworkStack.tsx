import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStack';
import SearchBar from '../components/SearchBar/SearchBar';
import ChatScreen from '../screens/ChatScreen';
import HeaderTabs from './HeaderTabs';
import UserProfileScreen from '../screens/UserProfileScreen';
import MeetingScreen from '../components/SearchBar/MeetingScreen';

const Stack = createStackNavigator<RootStackParamList>();

function NetworkStack() {
  return (
    <Stack.Navigator
      initialRouteName="NetworkScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="NetworkScreen" component={SearchBar} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="MessagesScreen" component={HeaderTabs} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
    </Stack.Navigator>
  );
}

export default NetworkStack;

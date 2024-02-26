import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStack';
import Profile from '../screens/ProfileScreen';
import ResetPassword from '../screens/auth/ResetPassword';
import UserMeetingsView from '../components/UserMeetings/UserMeetingsView';

const Stack = createStackNavigator<RootStackParamList>();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="UserMeetingsView" component={UserMeetingsView} />
    </Stack.Navigator>
  );
}

export default ProfileStack;

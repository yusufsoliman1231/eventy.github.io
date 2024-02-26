import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import ResetPassword from '../screens/auth/ResetPassword';

const Stack = createStackNavigator();

export default function OutsideStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

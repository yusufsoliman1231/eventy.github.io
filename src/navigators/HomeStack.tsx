import {createStackNavigator} from '@react-navigation/stack';
import Agenda from '../screens/Agenda';
import SignIn from '../screens/auth/SignIn';
import Exhibitors from '../screens/Exhibitors';
import FloorPlan from '../screens/FloorPlan';
import HomeScreen from '../screens/Home';
import Speakers from '../screens/Speakers';
import {RootStackParamList} from './RootStack';

const Stack = createStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Speakers"
        component={Speakers}
        // options={({route}) => ({
        //   headerTitle: (route as any)?.params?.alias,
        //   headerTitleAlign: 'center',
        //   headerLeftContainerStyle: {
        //     paddingLeft: 0,
        //   },
        // })}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FloorPlan" component={FloorPlan} />
      <Stack.Screen name="Agenda" component={Agenda} />
      <Stack.Screen name="Exhibitors" component={Exhibitors} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default HomeStack;

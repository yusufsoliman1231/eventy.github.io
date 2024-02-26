import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FC} from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import {RootStackParamList} from './RootStack';
import {useTheme} from 'react-native-paper';
import MessengerStack from './MessengerStack';
import ProfileStack from './ProfileStack';
import NetworkStack from './NetworkStack';
import MenuDropdown from '../components/MenuDropdown/MenuDropdown';
import Notifications from '../components/Notifications/Notifications';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator<RootStackParamList>();

const tabBarHeight = Platform.OS === 'ios' ? '12%' : '9%';
const borderTopRadius = Platform.OS === 'ios' ? 16 : 12;
const web = Platform.OS === 'web';

const BottomBarTabs: FC = ({notification, bottomNotifications}: any) => {
  const {t} = useTranslation();
  const theme = useTheme<any>();
  const homeIcon = ({color}: {focused: boolean; color: string}) => (
    <Icon name="home-variant" size={33} color={color} />
  );
  const accountIcon = ({color}: {focused: boolean; color: string}) => (
    <Icon name="account" size={33} color={color} />
  );
  const MessagesIcon = ({color}: {focused: boolean; color: string}) => (
    <Icon name="message-text" size={33} color={color} />
  );
  const NetworkIocn = ({color}: {focused: boolean; color: string}) => (
    <Icon name="account-multiple" size={33} color={color} />
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => null,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Poppins-Bold',
          marginHorizontal: 20,
        },
        headerLeft: () => <MenuDropdown />,
        headerRight: () => (
          <Notifications
            //@ts-ignore
            notification={notification}
          />
        ),
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Bold',
          fontSize: 12,
          bottom: Platform.OS === 'ios' ? 2 : 8,
        },
        tabBarStyle: {
          position: web ? 'relative' : 'absolute',
          height: tabBarHeight,
          borderTopWidth: 0,
          elevation: 24,
          shadowColor: '#111',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderTopLeftRadius: borderTopRadius,
          borderTopRightRadius: borderTopRadius,
        },
      }}>
      <Tab.Screen
        name={t('home') as any}
        component={HomeStack}
        options={({route}) => ({
          tabBarIcon: homeIcon,
          headerTitle: (route as any)?.params?.alias,
          tabBarLabel: t('home'),
        })}
      />
      <Tab.Screen
        name={t('messages') as any}
        // @ts-ignore
        component={MessengerStack}
        options={{
          tabBarBadge: `${bottomNotifications}`,
          tabBarBadgeStyle: {
            fontSize: 10,
            justifyContent: 'center',
            display: bottomNotifications >= 1 ? 'flex' : 'none',
          },
          tabBarLabel: t('messages'),
          tabBarIcon: MessagesIcon,
        }}
      />
      <Tab.Screen
        name={t('network') as any}
        // @ts-ignore
        component={NetworkStack}
        options={{
          tabBarIcon: NetworkIocn,
          tabBarLabel: t('network'),
        }}
      />
      <Tab.Screen
        name={t('profile') as any}
        // @ts-ignore
        component={ProfileStack}
        options={{
          tabBarIcon: accountIcon,
          tabBarLabel: t('profile'),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomBarTabs;

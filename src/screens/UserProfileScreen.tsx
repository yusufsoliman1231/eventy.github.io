TODO: 'i should update and edit this page and make it looks good';

import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Button, Divider, useTheme} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {helperFirstLetter} from '../utils/helperFirstLetter';
import {EvilIcons} from '@expo/vector-icons';

const UserProfileScreen = () => {
  const theme = useTheme<any>();
  const route = useRoute();
  const {firstName, lastName}: any = route?.params;
  const navigation = useNavigation();
  const tabBarHeight = Platform.OS === 'ios' ? '12%' : '9%';
  const borderTopRadius = Platform.OS === 'ios' ? 16 : 12;
  const web = Platform.OS === 'web';

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User's Profile",
      headerTitleAlign: 'flex-start',
      headerShown: true,
      headerLeft: () => (
        <EvilIcons
          name="chevron-left"
          size={50}
          color="#111"
          onPress={() => navigation.navigate('ChatMessages' as never)}
        />
      ),
    });
    navigation?.getParent()?.setOptions({
      headerShown: false,
      tabBarStyle: {display: 'none'},
      tabBarVisible: false,
    });
    return () =>
      navigation?.getParent()?.setOptions({
        headerShown: true,
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
        tabBarVisible: undefined,
      });
  }, [navigation.isFocused]);

  return (
    <View className="flex-1 bg-white">
      {/* Avatar Image */}
      <View className="mt-8 self-center">
        <Avatar.Text
          label={`${helperFirstLetter(firstName)}${helperFirstLetter(
            lastName,
          )}`}
          size={200}
          style={{
            backgroundColor: theme.colors.primary,
          }}
        />

        {/* User Data */}
        <View className="my-4 items-center space-y-2">
          <Text className="font-PoppinsRegular text-lg">{firstName}</Text>
          <Text className="text-graydark">{lastName}</Text>
        </View>
      </View>
      {/* DIVIDER */}
      <Divider className="my-12" />
      {/* Send Message Button */}
      <Button
        icon={() => (
          <Image
            source={require('../assets/icons/messageIcon.png')}
            className="mr-4 h-6 w-6"
          />
        )}
        // onPress={() => navigation.navigate('ChatScreen' as never)}
        className="mt-20 self-center "
        style={{
          backgroundColor: theme.colors.primary,
        }}>
        <Text className="font-PoppinsRegular text-white">Send Message</Text>
      </Button>
    </View>
  );
};

export default UserProfileScreen;

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/RootStack';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../Theme';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Camera} from 'expo-camera';
import {EvilIcons} from '@expo/vector-icons';
import {useAuth} from '../hooks/AuthProvider';

type Props = StackScreenProps<RootStackParamList, 'QrScreen'>;

export default function QrScreen() {
  const {user} = useAuth();
  const navigation = useNavigation();
  const tabBarHeight = Platform.OS === 'ios' ? '12%' : '9%';
  const borderTopRadius = Platform.OS === 'ios' ? 16 : 12;
  const web = Platform.OS === 'web';

  // HIDE THE BOTTOM BAR
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerShown: true,
      headerLeft: () => (
        <EvilIcons
          name="chevron-left"
          size={50}
          color="#111"
          onPress={() => navigation.goBack()}
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

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      //@ts-ignore
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}: any) => {
    setScanned(true);
    const qrData = JSON.parse(data);

    // console.log(qrData?.currentId, 'qrData?.currentId');
    //@ts-ignore
    navigation.navigate('ChatScreen', {
      currentId: user?.id,
      chatWithId: qrData?.currentId,
    });
  };

  if (hasPermission === null) {
    return (
      <View className="flex1 items-center justify-center">
        <Text>Please wait camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="flex1 items-center justify-center">
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      //@ts-ignore
      type={Camera.Constants.Type.back}
      ratio={'16:9'}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      barCodeScannerSettings={{
        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
      }}
    />
  );
}
('');

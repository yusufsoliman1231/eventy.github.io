import React from 'react';
import {Platform, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useGetCurrentEvent} from '../../services/react-query-hooks/get-curret-event';
import {Image} from 'expo-image';
import {
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import useImageurl from '../../hooks/useImageUrl';
import {useTranslation} from 'react-i18next';

const MenuDropdown = () => {
  const {t} = useTranslation();

  const initialUrl = useImageurl();
  const {data, isLoading} = useGetCurrentEvent();
  const navigation = useNavigation();
  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  React.useEffect(() => {
    let headerTitle;
    switch (focusedRouteName) {
      case 'HomeScreen':
        headerTitle = !isLoading ? data?.attributes.name : null;
        break;
      case 'Exhibitors':
        headerTitle = t('exhibitors');
        break;
      case 'Speakers':
        headerTitle = t('speakers');
        break;
      case 'FloorPlan':
        headerTitle = t('floorPlan');
        break;
      case 'Agenda':
        headerTitle = t('agenda');
        break;
      default:
        headerTitle = route.name;
        break;
    }
    navigation.setOptions({
      headerTitle,
    });
  }, [route.name, data?.attributes.name, focusedRouteName]);

  const image = data?.attributes.event_logo_image_url.logo;
  const web = Platform.OS === 'web';

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <StatusBar style="light" />

      {initialUrl && (
        <Image
          style={{
            width: 43,
            height: 43,
            borderRadius: 30,
            marginRight: web ? 20 : 0,
            marginLeft: 12,
            backgroundColor: '#fff',
          }}
          source={`${initialUrl}${image}`}
          contentFit="contain"
        />
      )}
      {/* <Text className={`ml-8 font-PoppinsBold text-white`}>
        {data?.attributes.name}
      </Text> */}
    </View>
  );
};

export default MenuDropdown;

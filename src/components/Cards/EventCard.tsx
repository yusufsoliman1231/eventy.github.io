import React from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'expo-image';
import {useTheme} from 'react-native-paper';
import useImageurl from '../../hooks/useImageUrl';
import {useTranslation} from 'react-i18next';

const EventCard = ({agendaDateFrom, agendaDateTo, eventCardImages}: any) => {
  const theme = useTheme<any>();

  const web = Platform.OS == 'web';
  const imageUrl = useImageurl();
  const {t} = useTranslation();

  const navigation = useNavigation();
  const eventyData = [
    {
      image: eventCardImages?.exhibitors_section_image
        ? {uri: `${imageUrl}${eventCardImages?.exhibitors_section_image}`}
        : require('../../assets/eventy-images/exhibitors.png'),
      eventyText: 'Exhibitors',
      name: t('exhibitors'),
    },
    {
      image: eventCardImages?.agenda_section_image
        ? {uri: `${imageUrl}${eventCardImages?.agenda_section_image}`}
        : require('../../assets/eventy-images/agenda.png'),
      eventyText: 'Agenda',
      name: t('agenda'),
    },
    {
      image: eventCardImages?.floor_plan_section_image
        ? {uri: `${imageUrl}${eventCardImages?.floor_plan_section_image}`}
        : require('../../assets/eventy-images/floorplan.png'),
      eventyText: 'FloorPlan',
      name: t('floorPlan'),
    },
    {
      image: eventCardImages?.speakers_section_image
        ? {uri: `${imageUrl}${eventCardImages?.speakers_section_image}`}
        : require('../../assets/eventy-images/speakers.png'),
      eventyText: 'Speakers',
      name: t('speakers'),
      floor_plan_details_images: eventCardImages?.floor_plan_details_images,
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
      }}>
      {eventyData.map((item: any, index) => (
        <TouchableOpacity
          key={item.name}
          style={{padding: 0, width: web ? 350 : 'auto'}}
          onPress={() =>
            //@ts-ignore
            navigation.navigate(item.eventyText, {
              agendaDateFrom: agendaDateFrom,
              agendaDateTo: agendaDateTo,
              floor_plan_details_images: item.floor_plan_details_images
                ? item.floor_plan_details_images
                : null,
            })
          }>
          <Image
            source={item.image}
            contentFit="contain"
            style={{
              aspectRatio: 3 / 2,
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              color: '#fff',
              padding: 20,
              backgroundColor: theme.colors.primary,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default EventCard;

// style={{
//   width: web ? 400 : web && isTabletOrMobileDevice ? 180 : 180,
//   height: web
//     ? ScreenHeight / 2
//     : web && isTabletOrMobileDevice
//     ? 180
//     : 180,
//   marginVertical: web && isTabletOrMobileDevice ? 0 : web ? 0 : 0,
//   maxWidth: web ? ScreenWidth / 2.5 : 180,
// }}

// import React from 'react';
// import {View, TouchableOpacity, Platform, Dimensions, Text} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {ScreenWidth, ScreenHeight} from '../shared';
// import {Image} from 'expo-image';
// import {useMediaQuery} from 'react-responsive';
// import {useTheme} from 'react-native-paper';

// const EventCard = ({agendaDateFrom, agendaDateTo}: any) => {
//   const theme = useTheme<any>();
//   const isTabletOrMobileDevice = useMediaQuery({
//     query: '(min-device-width: 500px)',
//   });

//   const screenWidth = Dimensions.get('window').width;
//   const imageWidth = screenWidth * 0.5; // 50% of the screen width

//   const navigation = useNavigation();
//   const eventyData = [
//     {
//       image: require('../../assets/eventy-images/exhibitors.png'),
//       eventyText: 'Exhibitors',
//       name: 'Exhibitors',
//     },
//     {
//       image: require('../../assets/eventy-images/agenda.png'),
//       eventyText: 'Agenda',
//       name: 'Agenda',
//     },
//     {
//       image: require('../../assets/eventy-images/floorplan.png'),
//       eventyText: 'Floor Plan',
//       name: 'FloorPlan',
//     },
//     {
//       image: require('../../assets/eventy-images/speakers.png'),
//       eventyText: 'Speakers',
//       name: 'Speakers',
//     },
//   ];

//   return (
//     <View className="flex-1 flex-row flex-wrap items-center justify-center">
//       {eventyData.map((item: any, index) => (
//         <TouchableOpacity
//           key={item.name}
//           className="m-4"
//           onPress={() =>
//             //@ts-ignore
//             navigation.navigate(item.name, {
//               agendaDateFrom: agendaDateFrom,
//               agendaDateTo: agendaDateTo,
//             })
//           }>
//           <Image
//             style={{
//               width: isTabletOrMobileDevice ? 400 : 180,
//               height: isTabletOrMobileDevice ? ScreenHeight / 3 : 180,
//               marginVertical: isTabletOrMobileDevice ? 10 : 0,
//               maxWidth: isTabletOrMobileDevice ? ScreenWidth / 2.5 : 180,
//             }}
//             contentFit="contain"
//             source={item.image}
//           />
//           <Text
//             style={{
//               textAlign: 'center',
//               fontFamily: 'Poppins-Bold',
//               fontSize: 16,
//               color: '#fff',
//               paddingVertical: 20,
//               marginTop: isTabletOrMobileDevice
//                 ? -(ScreenHeight / 10) * 0.2
//                 : -(ScreenHeight / 10) * 0.6,
//               backgroundColor: theme.colors.primary,
//               borderBottomRightRadius: 11,
//               borderBottomLeftRadius: 11,
//             }}>
//             {item?.name}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default EventCard;

// style={{
//   width: web ? 400 : web && isTabletOrMobileDevice ? 180 : 180,
//   height: web
//     ? ScreenHeight / 2
//     : web && isTabletOrMobileDevice
//     ? 180
//     : 180,
//   marginVertical: web && isTabletOrMobileDevice ? 0 : web ? 0 : 0,
//   maxWidth: web ? ScreenWidth / 2.5 : 180,
// }}

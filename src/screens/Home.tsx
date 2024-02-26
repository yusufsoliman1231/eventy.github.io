import React, {FC} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
// types
import {RootStackParamList} from '../navigators/RootStack';
import {StackScreenProps} from '@react-navigation/stack';
import EventCard from '../components/Cards/EventCard';
import EventDetailsCard from '../components/Cards/EventDetailsCard';
import {useGetCurrentEvent} from '../services/react-query-hooks/get-curret-event';
import PartnersView from '../components/PartnersView/PartnersView';

import {theme} from '../Theme';
import useImageurl from '../hooks/useImageUrl';
export type Props = StackScreenProps<RootStackParamList, 'HomeScreen'>;

const web = Platform.OS === 'web';
const Home: FC<Props> = () => {
  const {t} = useTranslation();
  const [status, setStatus] = React.useState<any>({});
  const {data, isLoading, isError} = useGetCurrentEvent();
  const video = React.useRef(null);
  const imageUrl = useImageurl();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  }

  if (isError) {
    location.reload();
  }

  return (
    <SafeAreaView className="flex-1 bg-graylight">
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data?.attributes.event_images_url.app_video
              ? `${imageUrl}${data?.attributes.event_images_url.app_video}`
              : 'https://media.istockphoto.com/id/1161129528/video/managers-discussing-work-in-hotel-corridor.mp4?s=mp4-640x640-is&k=20&c=OQAthPiVDWVZ-bo0V7dDVEcQWzdIZ-AYuVEz3V-LFnQ=',
          }}
          videoStyle={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 3,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <IconButton
            icon={
              status.isPlaying
                ? 'pause'
                : require('../assets/icons/playIcon.png')
            }
            size={80}
            iconColor="white"
            onPress={() =>
              status.isPlaying
                ? //@ts-ignore
                  video.current.pauseAsync()
                : //@ts-ignore
                  video.current.playAsync()
            }
          />
        </View>
      </View>
      <ScrollView className={`mt-4 ${web ? 'mb-0' : 'mb-16'}`}>
        <EventDetailsCard
          icon={require('../assets/icons/aboutIcon.png')}
          title={t('about')}
          subTitle={data?.attributes.about}
        />
        <EventDetailsCard
          icon={require('../assets/icons/whereIcon.png')}
          rightIcon={require('../assets/icons/locationIcon.png')}
          title={t('location')}
          subTitle={data?.attributes.location}
        />
        <EventDetailsCard
          icon={require('../assets/icons/whenIcon.png')}
          title={t('when')}
          subTitle={`from ${data?.attributes.event_date_from} to ${data?.attributes.event_date_to}`}
        />
        <EventCard
          agendaDateFrom={data?.attributes.event_date_from}
          agendaDateTo={data?.attributes.event_date_to}
          eventCardImages={data?.attributes.event_images_url}
        />
        <PartnersView />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  buttons: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default Home;

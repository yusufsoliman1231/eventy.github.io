import {useCallback, useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import MessagesCard from '../Cards/MessagesCard';
import {useGetEventUserChats} from '../../services/react-query-hooks/get-event-user-chats';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../../Theme';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../../hooks/AuthProvider';
import {useTranslation} from 'react-i18next';

function ChatMessagesScreen() {
  const {t} = useTranslation();
  const {user} = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const {data, isLoading, refetch, isError} = useGetEventUserChats();

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    if (user?.seenNotifications || isFocused) {
      refetch();
    }
  }, [user?.seenNotifications, isFocused]);

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

  if (data?.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-PoppinsBold text-lg">{t('noMessages')}</Text>
      </View>
    );
  }

  const sortedData = data
    ?.filter((item: any) => item.attributes.status === 'accepted')
    .slice()
    .sort((a: any, b: any) => {
      const dateA = new Date(a.attributes.last_detail_created_at);
      const dateB = new Date(b.attributes.last_detail_created_at);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <ScrollView className="">
      {sortedData?.map((item: any, index: any) => (
        <View key={`messages-card-${index}`}>
          <MessagesCard item={item} index={index} refetch={refetch} />
        </View>
      ))}
    </ScrollView>
  );
}
export default ChatMessagesScreen;

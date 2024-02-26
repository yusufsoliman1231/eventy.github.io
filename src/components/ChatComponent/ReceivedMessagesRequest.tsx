import {
  Card as NativePaperCard,
  Avatar,
  IconButton,
  Divider,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import {ScrollView, Text} from 'react-native';
import {View} from 'react-native';
import {useAcceptChat} from '../../services/react-query-hooks/post-accept-request-chat';
import {useRejectChat} from '../../services/react-query-hooks/post-reject-request-chat';
import {useGetChatRequests} from '../../services/react-query-hooks/get-chat-requests';
import {useGetEventUserChats} from '../../services/react-query-hooks/get-event-user-chats';
import {useEffect, useState} from 'react';
import {helperFirstLetter} from '../../utils/helperFirstLetter';
import {useTranslation} from 'react-i18next';

function ReceivedMessagesRequest() {
  const theme = useTheme<any>();
  const {t} = useTranslation();

  const {
    mutate: acceptMutate,
    isLoading: acceptLoading,
    isSuccess: acceptSuccess,
  } = useAcceptChat();
  const {
    mutate: rejectMutate,
    isLoading: rejectLoading,
    isSuccess: rejectSuccess,
  } = useRejectChat();

  const {data: receivedRequests, isLoading, refetch} = useGetChatRequests();
  const {refetch: chatMessagesRefetch} = useGetEventUserChats();

  useEffect(() => {
    if (acceptSuccess || rejectSuccess) {
      refetch();
      chatMessagesRefetch();
    }
  }, [acceptSuccess, rejectSuccess]);

  if (isLoading) {
    <ActivityIndicator size="large" color={theme.colors.primary} />;
  }
  if (receivedRequests?.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-PoppinsBold  text-sm">
          {t('noMessageRequests')}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      {receivedRequests?.map((item: any, index: any) => (
        <NativePaperCard
          key={`messages-request-card-${index}`}
          elevation={1}
          style={{
            marginTop: 4,
            backgroundColor: '#fff',
            marginHorizontal: 4,
          }}>
          <NativePaperCard.Title
            title={`${item?.attributes.sender?.first_name}\n${item?.attributes.sender?.last_name}`}
            titleStyle={{
              // color: theme.colors.primary,
              fontFamily: 'Poppins-Regular',
              left: 20,
              fontSize: 14,
            }}
            left={isAcitve => (
              <Avatar.Text
                label={`${helperFirstLetter(
                  item?.attributes.sender.first_name,
                )}${helperFirstLetter(item?.attributes.sender.last_name)}`}
                size={50}
                style={{
                  left: 10,
                  backgroundColor: theme.colors.primary,
                }}
              />
            )}
            right={() => (
              <View className="flex-row">
                <IconButton
                  icon={require('../../assets/icons/xIcon.png')}
                  size={40}
                  iconColor="red"
                  onPress={() => rejectMutate(item?.id)}
                />
                <Divider
                  style={{
                    height: '80%',
                    width: 0.3,
                    marginVertical: 8,
                  }}
                />
                <IconButton
                  icon={require('../../assets/icons/oIcon.png')}
                  size={40}
                  iconColor="green"
                  onPress={() => acceptMutate(item?.id)}
                />
              </View>
            )}
            rightStyle={{marginRight: 20}}
          />
        </NativePaperCard>
      ))}
    </ScrollView>
  );
}

export default ReceivedMessagesRequest;

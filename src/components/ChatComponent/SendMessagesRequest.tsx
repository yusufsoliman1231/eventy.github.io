import {
  Card as NativePaperCard,
  Avatar,
  IconButton,
  Divider,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {View} from 'react-native';
import {useRejectChat} from '../../services/react-query-hooks/post-reject-request-chat';
import {useGetEventUserChats} from '../../services/react-query-hooks/get-event-user-chats';

import {useEffect} from 'react';
import {helperFirstLetter} from '../../utils/helperFirstLetter';
import {useGetChatRequestsSend} from '../../services/react-query-hooks/get-chat-requests-send';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';

function SendMessagesRequest() {
  const {t} = useTranslation();
  const theme = useTheme<any>();
  const {
    mutate: rejectMutate,
    isLoading: rejectLoading,
    isSuccess: rejectSuccess,
  } = useRejectChat();
  const {
    data: sendMessageRequest,
    isLoading,
    refetch,
  } = useGetChatRequestsSend();
  const {refetch: chatMessagesRefetch} = useGetEventUserChats();

  useEffect(() => {
    if (rejectSuccess) {
      refetch();
      chatMessagesRefetch();
    }
  }, [rejectSuccess]);

  if (isLoading) {
    <ActivityIndicator size="large" color={theme.colors.primary} />;
  }
  if (sendMessageRequest?.length === 0) {
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
      {sendMessageRequest?.map((item: any, index: any) => (
        <NativePaperCard
          key={`messages-request-card-${index}`}
          elevation={1}
          style={{
            marginTop: 4,
            backgroundColor: '#fff',
            marginHorizontal: 4,
          }}>
          <NativePaperCard.Title
            title={`${item?.attributes.receiver?.first_name}\n${item?.attributes.receiver?.last_name}`}
            titleStyle={{
              // color: theme.colors.primary,
              fontFamily: 'Poppins-Regular',
              left: 20,
              fontSize: 14,
            }}
            left={isAcitve => (
              <Avatar.Text
                label={`${helperFirstLetter(
                  item?.attributes.receiver.first_name,
                )}${helperFirstLetter(item?.attributes.receiver.last_name)}`}
                size={50}
                style={{
                  left: 10,
                  backgroundColor: theme.colors.primary,
                }}
              />
            )}
            right={() => (
              <View className="flex-row">
                {/* <IconButton
                  icon={require('../../assets/icons/xIcon.png')}
                  size={40}
                  iconColor="red"
                  onPress={() => rejectMutate(item?.id)}
                /> */}
                <Divider
                  style={{
                    height: '80%',
                    width: 0.3,
                    marginVertical: 8,
                  }}
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

export default SendMessagesRequest;

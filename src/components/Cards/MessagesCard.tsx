import {
  Card as NativePaperCard,
  Avatar,
  Badge,
  useTheme,
} from 'react-native-paper';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/AuthProvider';
import {helperFirstLetter} from '../../utils/helperFirstLetter';
import {formatDate} from '../../utils/dateCheck';
import {useEffect} from 'react';

const MessagesCard = ({item, index}: any) => {
  const theme = useTheme<any>();
  const {user, notificaions} = useAuth();
  const navigaton = useNavigation();

  let seenNotifications: any;
  let currentOpen: any;
  let chatWith: any;
  let messageNotifications: any;

  const sender = item?.attributes.sender.id;
  const receiver = item?.attributes.receiver.id;

  if (sender === +user?.id) {
    currentOpen = item?.attributes.sender;
    chatWith = item?.attributes.receiver;
  }
  if (receiver === +user?.id) {
    currentOpen = item?.attributes.receiver;
    chatWith = item?.attributes.sender;
  }

  if (user?.seenNotifications) {
    seenNotifications = user?.seenNotifications;
  }

  if (user.messageNotifications) {
    messageNotifications = user.messageNotifications;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        //@ts-ignore
        navigaton.navigate('ChatScreen', {
          chatId: item?.id,
          currentId: user?.id,
          chatWithId: JSON.stringify(chatWith?.id),
          chatWithFirstName: JSON.stringify(chatWith?.first_name),
          chatWithLastName: JSON.stringify(chatWith?.last_name),
          routeName: 'ChatMessagesScreen',
        })
      }
      style={{
        paddingVertical: 4,
      }}>
      <NativePaperCard
        elevation={1}
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 4,
        }}>
        <NativePaperCard.Title
          title={chatWith?.first_name}
          subtitle={item?.attributes.last_detail_message}
          titleStyle={{
            color: theme.colors.darkGray,
            fontFamily: 'Poppins-Regular',
            left: 10,
            fontSize: 14,
          }}
          subtitleStyle={{
            color: theme.colors.semiGray,
            fontFamily: messageNotifications?.some(
              (notification: any) =>
                notification?.event_user_chat_id === +item?.id &&
                item?.attributes.unseen_messages_count > 0,
            )
              ? 'Poppins-Bold'
              : 'Poppins-Regular',
            left: 10,
            bottom: 2,
            fontSize: 12,
          }}
          left={isAcitve => (
            <Avatar.Text
              label={`${helperFirstLetter(
                chatWith?.first_name,
              )}${helperFirstLetter(chatWith?.last_name)}`}
              size={50}
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />
          )}
          right={() => (
            <View className="relative flex-row">
              <Text className="font-PoppinsRegular text-xs text-graydark">
                {formatDate(item?.attributes.last_detail_created_at)}
              </Text>
              {messageNotifications?.some(
                (notification: any) =>
                  notification?.event_user_chat_id === +item?.id &&
                  item?.attributes.unseen_messages_count > 0,
              ) && (
                <Badge
                  style={{
                    position: 'absolute',
                    top: -13,
                    right: -5,
                    transform: 'translate(50%, -50%)',
                  }}
                  size={20}>
                  {item?.attributes.unseen_messages_count}
                </Badge>
              )}
            </View>
          )}
          rightStyle={{marginRight: 20}}
        />
      </NativePaperCard>
    </TouchableOpacity>
  );
};

export default MessagesCard;

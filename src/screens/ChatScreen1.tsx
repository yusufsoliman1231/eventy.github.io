import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from '../components/ChatComponent/InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderTime,
} from '../components/ChatComponent/MessageContainer';
import {StatusBar} from 'expo-status-bar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {theme} from '../Theme';
import {Avatar, IconButton} from 'react-native-paper';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {useAuth} from '../hooks/AuthProvider';
import {EvilIcons} from '@expo/vector-icons';
import {useGetChatInfo} from '../services/react-query-hooks/get-chat-info';
import {helperFirstLetter} from '../utils/helperFirstLetter';

const ChatScreen = () => {
  const {user} = useAuth();
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messages, setMessages] = useState<any>([]);
  const [isText, setIsText] = useState('');
  const navigation = useNavigation();
  const tabBarHeight = Platform.OS === 'ios' ? '12%' : '9%';
  const borderTopRadius = Platform.OS === 'ios' ? 16 : 12;
  const web = Platform.OS === 'web';
  const route = useRoute().params;
  const {chatId, currentId, receiverId, currentOpen, chatWith}: any = route;

  const {
    data: chatInfo,
    isSuccess: chatInfoSucc,
    isStale,
  } = useGetChatInfo({
    receiverId,
    currentId,
  });

  // console.log(chatInfoSucc, chatInfo, 'chatInfoSuccchatInfo');
  // console.log(chatWith, 'chatWithchatWith');
  // console.log(currentOpen, ' currentOpencurrentOpen');
  // console.log(currentId, 'currentId');
  // console.log(receiverId, 'receiverId');

  // HIDE THE BOTTOM BAR
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex-row items-center gap-2">
          <Avatar.Text
            label={`${helperFirstLetter(
              chatWith.first_name,
            )}${helperFirstLetter(chatWith.last_name)}`}
            size={50}
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
          <Text className="text-md font-PoppinsBold">{`${chatWith.first_name} ${chatWith.last_name}`}</Text>
        </View>
      ),
      headerTitleAlign: 'flex-start',
      headerShown: true,
      headerLeft: () => (
        <EvilIcons
          name="chevron-left"
          size={50}
          color="#111"
          onPress={() => navigation.navigate('MessagesScreen' as never)}
        />
      ),
    });
    navigation.getParent()?.setOptions({
      headerShown: false,
      tabBarStyle: {display: 'none'},
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
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
  }, [navigation]);

  // WEBSOCKET CALL
  const {sendMessage, lastMessage, readyState}: any = useWebSocket(
    `wss://sc.eventy.cloud/cable?subdomain_name=sc&token=${user?.access_token}`,
    {
      onMessage(event) {
        // console.log('message sent');
      },
    },
  );

  if (chatInfoSucc && chatInfo?.data !== null) {
    sendMessage(
      JSON.stringify({
        command: 'subscribe',
        identifier: `{"channel":"ChatEventChannel","data": {"chat_id": ${chatInfo?.data?.id}}}`,
      }),
    );
  }

  if ((chatInfoSucc && chatInfo?.data === null, chatId)) {
    sendMessage(
      JSON.stringify({
        command: 'subscribe',
        identifier: `{"channel":"ChatEventChannel","data": {"chat_id": ${chatId}}}`,
      }),
    );
  }

  useEffect(() => {
    if (lastMessage) {
      console.log(lastMessage, 'last message');
      const {message} = JSON.parse(lastMessage.data);
      if (message?.messages) {
        const onlineMessages = message?.messages;
        const reversed = onlineMessages?.reverse();
        setChatMessages(reversed);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (web && chatMessages) {
      setTimeout(() => {
        setMessages(chatMessages);
      }, 100);
    } else {
      setMessages(chatMessages);
    }
  }, [lastMessage]);

  const onSend = useCallback(
    (newMessages = []) => {
      if (chatInfoSucc && chatInfo?.data === null) {
        sendMessage(
          JSON.stringify({
            command: 'subscribe',
            //@ts-ignore
            identifier: `{"channel":"ChatEventChannel","data": {"receiver_id": ${receiverId},"message": "${newMessages[0]?.text}"}}`,
          }),
        );
        setMessages((prevMessages: any) =>
          GiftedChat.append(prevMessages, newMessages),
        );
      } else {
        if (chatInfoSucc && chatInfo?.data !== null && !chatId) {
          sendMessage(
            JSON.stringify({
              command: 'message',
              identifier: `{"channel":"ChatEventChannel","data": {"chat_id": ${chatInfo?.data?.id}}}`,
              //@ts-ignore
              data: `{"message":"${newMessages[0]?.text}"}`,
            }),
          );
          setMessages((prevMessages: any) =>
            GiftedChat.append(prevMessages, newMessages),
          );
        } else {
          sendMessage(
            JSON.stringify({
              command: 'message',
              identifier: `{"channel":"ChatEventChannel","data": {"chat_id": ${chatId}}}`,
              //@ts-ignore
              data: `{"message":"${newMessages[0]?.text}"}`,
            }),
          );
          setMessages((prevMessages: any) =>
            GiftedChat.append(prevMessages, newMessages),
          );
        }
      }
    },
    [
      chatId,
      chatInfo?.data,
      chatInfoSucc,
      receiverId,
      sendMessage,
      setMessages,
    ],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar style="dark" />
      <GiftedChat
        renderTime={renderTime}
        onLoadEarlier={() => console.log('last')}
        inverted={true}
        forceGetKeyboardHeight
        messages={messages}
        text={text}
        // showAvatarForEveryMessage
        onInputTextChanged={e => setText(e)}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: +currentId,
        }}
        alignTop
        isTyping={true}
        alwaysShowSend
        scrollToBottom
        bottomOffset={27}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        // renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderQuickReplies={() => null}
        scrollToBottomComponent={() => (
          <View>
            <IconButton size={15} icon="arrow-down" />
          </View>
        )}
        messagesContainerStyle={{
          backgroundColor: '#F6F6F6',
          paddingVertical: 20,
          overflow: web ? 'scroll' : 'hidden',
        }}
        renderUsernameOnMessage
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: (tag: any) => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
        // onPressAvatar={console.log}
        // renderSystemMessage={renderSystemMessage}
        // renderCustomView={renderCustomView}
        // isCustomViewBottom
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Actions, GiftedChat} from 'react-native-gifted-chat';
import {
  renderInputToolbar,
  renderComposer,
  renderSend,
} from '../components/ChatComponent/InputToolbar';
import {
  renderBubble,
  renderMessage,
  renderMessageText,
  renderTime,
} from '../components/ChatComponent/MessageContainer';
import {StatusBar} from 'expo-status-bar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Animated,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  IconButton,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {useAuth} from '../hooks/AuthProvider';
import {Entypo, EvilIcons} from '@expo/vector-icons';
import {useGetChatInfo} from '../services/react-query-hooks/get-chat-info';
import {helperFirstLetter} from '../utils/helperFirstLetter';
import EmojiPicker, {useRecentPicksPersistence} from 'rn-emoji-keyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePostRequestChat} from '../services/react-query-hooks/post-request-chat';
import {ScreenWidth} from '../components/shared';
import useAsyncStorage from '../hooks/useAsyncStorage';

const ChatScreen = () => {
  const theme = useTheme<any>();
  const {user} = useAuth();
  const inputRef = useRef<TextInput>(null);
  const [subdomain, setSubdomain] = useAsyncStorage('subdomain', '');
  const [chatScreenLocalStorageToken, setLocalStorageToken]: any =
    useAsyncStorage('userId', '');
  const tabBarTranslateY = useRef(new Animated.Value(100)).current; // Start offscreen

  useRecentPicksPersistence({
    initialization: () =>
      AsyncStorage.getItem('emoji').then(item => JSON.parse(item || '[]')),
    onStateChange: next => AsyncStorage.setItem('emoji', JSON.stringify(next)),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [postChatId, setPostChatId] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const tabBarHeight = Platform.OS === 'ios' ? '12%' : '9%';
  const borderTopRadius = Platform.OS === 'ios' ? 16 : 12;
  const web = Platform.OS === 'web';
  const navigation = useNavigation();
  const route = useRoute();
  const {
    chatId,
    currentId,
    receiverId,
    chatWithId,
    chatWithFirstName,
    chatWithLastName,
    routeName,
  }: any = route?.params;

  const {data: chatInfo, isSuccess: chatInfoSucc} = useGetChatInfo({
    receiverId,
    currentId,
  });

  const {
    mutate: postRequestChat,
    isLoading: postRequestChatLoading,
    isError: postRequestChatError,
    isSuccess: postRequestChatSuccess,
    data: postRequestChatData,
  } = usePostRequestChat();

  const handleNavigations = () => {
    if (routeName === 'ChatMessagesScreen') {
      navigation.navigate('MessagesScreen' as never);
    } else {
      navigation.goBack();
    }
  };
  // HIDE THE BOTTOM BAR
  useEffect(() => {
    navigation.setOptions({
      headerTitle: (route: any) => (
        <TouchableOpacity
          onPress={() =>
            //@ts-ignore
            navigation.navigate('UserProfileScreen' as never, {
              firstName: JSON.parse(chatWithFirstName),
              lastName: JSON.parse(chatWithLastName),
            })
          }
          className="flex-row items-center gap-2">
          <Avatar.Text
            label={`${
              chatWithFirstName
                ? helperFirstLetter(JSON.parse(chatWithFirstName))
                : 'U'
            }${
              chatWithLastName
                ? helperFirstLetter(JSON.parse(chatWithLastName))
                : 'N'
            }`}
            size={50}
            style={{
              backgroundColor: theme.colors.primary,
            }}
          />
          <Text className="text-md font-PoppinsBold">{`${
            chatWithFirstName && JSON.parse(chatWithFirstName)
          } ${chatWithLastName && JSON.parse(chatWithLastName)}`}</Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'flex-start',
      headerShown: true,
      headerLeft: () => (
        <EvilIcons
          name="chevron-left"
          size={50}
          color="#111"
          onPress={handleNavigations}
        />
      ),
    });
    navigation?.getParent()?.setOptions({
      headerShown: false,
      tabBarStyle: {display: 'none'},
      tabBarVisible: false,
    });
    return () => {
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
    };
  });
  // WEBSOCKET CALL
  const socketUrl =
    user && subdomain
      ? `wss://${subdomain}.eventy.cloud/cable?subdomain_name=${subdomain}&token=${user.access_token}`
      : null;
  // console.log(socketUrl, 'socketUrl from Chat');
  const {lastMessage, sendMessage, readyState} = useWebSocket(socketUrl);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  useEffect(() => {
    // if user come from networkscreen
    if (chatInfoSucc && chatInfo?.data !== null) {
      console.log('data not null');
      sendMessage(
        JSON.stringify({
          command: 'subscribe',
          identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${
            chatInfo?.data?.id || postChatId
          }}}`,
        }),
      );
      setTimeout(() => {
        sendMessage(
          JSON.stringify({
            command: 'message',
            identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${
              chatInfo?.data?.id || postChatId
            }}}`,
            data: `{"user_id":${currentId}}`,
          }),
        );
      }, 300);
    }

    //if user come from messagescreen
    if (
      (chatInfoSucc && chatInfo?.data === null && chatId) ||
      (chatInfoSucc && chatInfo?.data === null && postChatId)
    ) {
      console.log('data null');
      sendMessage(
        JSON.stringify({
          command: 'subscribe',
          identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${
            chatId || postChatId
          }}}`,
        }),
      );
      setTimeout(() => {
        console.log('timeout data null');
        sendMessage(
          JSON.stringify({
            command: 'message',
            identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${
              chatId || postChatId
            }}}`,
            data: `{"user_id":${currentId}}`,
          }),
        );
      }, 300);
    }
  }, [readyState !== 1]);

  // LAST MESSAGE EFFECT
  useEffect(() => {
    if (lastMessage) {
      console.log(lastMessage, 'lastmessage');
      const {message} = JSON.parse(lastMessage.data);
      console.log(message, 'messages');
      if (message?.chat) {
        const onlineMessages = message?.chat;
        const reversed = onlineMessages?.reverse();
        if (web) {
          setTimeout(() => {
            setMessages(reversed);
            if (chatScreenLocalStorageToken !== currentId) {
              // location.reload();
              location.reload();
              console.log('dones');
            }
          }, 100);
        } else {
          setMessages(reversed);
          if (chatScreenLocalStorageToken !== currentId) {
            // location.reload();
            location.reload();
          }
        }
      }
    }
  }, [lastMessage]);

  // SEND MESSAGE FUNC
  const onSend = async (newMessages = []) => {
    if (chatInfoSucc && chatInfo?.data !== null && !chatId) {
      // console.log(
      //   JSON.stringify({
      //     command: 'message',
      //     identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${chatInfo?.data?.id}}}`,
      //     data: `{"message":"${
      //       //@ts-ignore
      //       newMessages[0]?.text
      //     }","user_id":${currentId}}`,
      //   }),
      // );
      // console.log('if networkscreen');
      sendMessage(
        JSON.stringify({
          command: 'message',
          identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${chatInfo?.data?.id}}}`,
          //i need to change this to current user id
          //@ts-ignore
          data: `{"message":"${newMessages[0]?.text}","user_id":${currentId}}`,
        }),
      );
      setMessages((prevMessages: any) =>
        GiftedChat.append(prevMessages, newMessages),
      );
    } else if (chatInfoSucc && chatInfo?.data === null && chatId) {
      console.log('else for chatmessgescreen');
      console.log(
        JSON.stringify({
          command: 'message',
          identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${chatId}}}`,
          data: `{"message":"${
            //@ts-ignore
            newMessages[0]?.text
          }","user_id":${currentId}}`,
        }),
      );
      sendMessage(
        JSON.stringify({
          command: 'message',
          identifier: `{"channel":"ChatEventChannel","data":{"chat_id":${chatId}}}`,
          data: `{"message":"${
            //@ts-ignore
            newMessages[0]?.text
          }","user_id":${currentId}}`,
        }),
      );
      setMessages((prevMessages: any) =>
        GiftedChat.append(prevMessages, newMessages),
      );
    } else {
      postRequestChat({
        receiverId,
        chatWithId,
        //@ts-ignore
        message: newMessages[0]?.text,
      });
      if (postRequestChatSuccess && !postRequestChatLoading) {
        const postRequestId = await postRequestChatData?.data.data.id;
        setPostChatId(postRequestId);
      }
      setMessages((prevMessages: any) =>
        GiftedChat.append(prevMessages, newMessages),
      );
    }
  };

  const handlePick = (emojiObject: any) => {
    setText(pref => pref + emojiObject.emoji);
    /* example emojiObject = {
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
        "unicode_version": "0.6",
      }
    */
  };
  // Inside your component
  // if (readyState !== 1) {
  //   return (
  //     <ActivityIndicator
  //       animating={true}
  //       color={theme.colors.primary}
  //       className="m-auto"
  //       size={'large'}
  //     />
  //   );
  // }

  return (
    user.access_token && (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <StatusBar style="dark" />
        <GiftedChat
          textInputRef={inputRef}
          renderTime={renderTime}
          forceGetKeyboardHeight
          messages={messages}
          text={text}
          onInputTextChanged={e => setText(e)}
          onSend={(messages: any) => onSend(messages)}
          user={{
            _id: +currentId,
          }}
          alignTop
          // isTyping={true}
          alwaysShowSend
          scrollToBottom
          bottomOffset={27}
          renderInputToolbar={renderInputToolbar}
          renderActions={() => (
            <View style={{flexDirection: 'row'}}>
              {/* <Actions
              containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                marginRight: 4,
                marginBottom: 0,
              }}
              icon={() => (
                <Entypo name="attachment" size={24} color={'#949494'} />
              )}
              onPressActionButton={() => console.log('Open attachment')}
              optionTintColor="#222B45"
            /> */}
              <Actions
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                  marginRight: 4,
                  marginBottom: 0,
                }}
                icon={() => (
                  <Entypo name="emoji-happy" size={24} color={'#949494'} />
                )}
                onPressActionButton={() => setIsOpen(!isOpen)}
                optionTintColor="#222B45"
              />
            </View>
          )}
          renderComposer={renderComposer}
          renderSend={renderSend}
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
            paddingVertical: 50,
            overflow: web ? 'scroll' : 'hidden',
            flexDirection: 'column-reverse',
          }}
          // showAvatarForEveryMessage
          // renderAvatar={renderAvatar}
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
        <EmojiPicker
          hideHeader
          styles={{
            container: {
              maxWidth: 1180,
              alignSelf: 'center',
              width: ScreenWidth,
            },
          }}
          allowMultipleSelections
          enableRecentlyUsed
          onEmojiSelected={handlePick}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </SafeAreaView>
    )
  );
};

export default ChatScreen;

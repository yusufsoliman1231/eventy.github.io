/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Platform} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Time,
} from 'react-native-gifted-chat';

const web = Platform.OS === 'web';

export const renderAvatar = (props: any) => (
  <Avatar
    {...props}
    containerStyle={{
      left: {backgroundColor: '#fff', top: '20%', borderRadius: 50},
      right: {backgroundColor: '#0084FF', top: '20%', borderRadius: 50},
    }}
    imageStyle={{
      left: {
        width: 40,
        height: 40,
        borderRadius: 50,
      },
      right: {width: 40, height: 40, borderRadius: 50},
    }}
  />
);

export const renderBubble = (props: any) => (
  <Bubble
    {...props}
    containerStyle={{
      left: {
        backgroundColor: '#F6F6F6',
      },
      right: {backgroundColor: '#F6F6F6'},
    }}
    wrapperStyle={{
      left: {
        backgroundColor: 'tranparent',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
      right: {
        backgroundColor: 'tranparent',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
      },
      textStyle: {
        left: {color: '#121212'},
        right: {color: '#fff'},
      },
    }}
    bottomContainerStyle={{}}
    tickStyle={{}}
    textStyle={{color: '#111'}}
    usernameStyle={{}}
    containerToNextStyle={{
      left: {},
      right: {},
    }}
    containerToPreviousStyle={{
      left: {},
      right: {},
    }}
  />
);

export const renderMessage = (props: any) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{
      left: {backgroundColor: '#F6F6F6', marginVertical: 10},
      right: {
        backgroundColor: '#F6F6F6',
        right: web ? 45 : 4,
        marginVertical: 10,
      },
    }}
  />
);

export const renderTime = (props: any) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          top: 2,
          color: '#a7a7a7',
        },
        right: {
          top: 2,
          color: '#a7a7a7',
        },
      }}
    />
  );
};

export const renderMessageText = (props: any) => (
  <MessageText
    {...props}
    containerStyle={{
      left: {
        backgroundColor: '#fff',
        minHeight: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
      },
      right: {
        backgroundColor: '#0084FF',
        minHeight: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
      },
    }}
    textStyle={{
      left: {color: '#121212'},
      right: {color: '#fff'},
    }}
    linkStyle={{
      left: {color: 'orange'},
      right: {color: 'orange'},
    }}
    customTextStyle={{fontSize: 18, lineHeight: 22}}
  />
);

export const renderSystemMessage = (props: any) => (
  <SystemMessage
    {...props}
    containerStyle={{backgroundColor: '#fff'}}
    wrapperStyle={{borderWidth: 10, borderColor: 'white'}}
    textStyle={{color: '#1111', fontWeight: '900'}}
  />
);

// export const renderCustomView = ({user}) => (
//   <View style={{minHeight: 20, alignItems: 'center'}}>
//     <Text>
//       Current user:
//       {user.name}
//     </Text>
//     <Text>From CustomView</Text>
//   </View>
// );

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {InputToolbar, Composer, Send} from 'react-native-gifted-chat';
import {Image} from 'expo-image';

export const renderInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#FFFFFF',
      paddingVertical: 10,
    }}
    primaryStyle={{
      alignItems: 'center',
    }}
  />
);

export const renderComposer = (props: any) => (
  <Composer
    {...props}
    composerHeight={50}
    textInputStyle={{
      backgroundColor: '#FAFBFB',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E7E7E7',
      paddingTop: 10,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = (props: any) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      borderRadius: 50,
    }}>
    <Image
      contentFit="contain"
      style={{width: 34, height: 34}}
      source={require('../../assets/icons/sendIcon.png')}
    />
  </Send>
);
{
  /* <Pressable>
<MaterialCommunityIcons icon="send" size={20} iconColor="white" />
</Pressable> */
}

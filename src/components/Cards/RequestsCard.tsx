import React from 'react';
import {
  Card as NativePaperCard,
  Avatar,
  IconButton,
  Divider,
} from 'react-native-paper';
import {theme} from '../../Theme';
import {Image, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RequestsCard = ({title, subTitle, icon, rightIcon}: any) => {
  const navigaton = useNavigation();
  return (
    <NativePaperCard
      elevation={1}
      style={{
        marginTop: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
      }}>
      <NativePaperCard.Title
        title={'messages from '}
        titleStyle={{
          color: theme.colors.primary,
          fontFamily: 'Poppins-Regular',
          marginLeft: 4,
          fontSize: 14,
        }}
        left={isAcitve => <Avatar.Image size={50} source={icon} />}
        right={() => (
          <View className="flex-row">
            <IconButton
              icon={require('../../assets/icons/xIcon.png')}
              size={40}
              iconColor="red"
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
              // onPress={() => console.log('hello world')}
              // onPress={() => navigaton.navigate('ChatScreen ' as never)}
            />
          </View>
        )}
        rightStyle={{marginRight: 20}}
      />
    </NativePaperCard>
  );
};

export default RequestsCard;

import React from 'react';
import {Card, Avatar, IconButton} from 'react-native-paper';
import {theme} from '../../Theme';
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';

const UserCard = ({title, subTitle, icon, rightIcon}: any) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <TouchableOpacity>
        <Card
          elevation={0}
          style={{
            marginHorizontal: 4,
            borderColor: 'gray',
            borderBottomWidth: 0.3,
          }}>
          <Card.Title
            title={'amr-adel&'}
            titleStyle={{
              color: theme.colors.gray,
              fontFamily: 'Poppins-Regular',
              marginLeft: 10,
              fontSize: 12,
              top: 10,
            }}
            left={isAcitve => (
              <Avatar.Image
                size={50}
                source={require('../../assets/images/coverProfile.png')}
              />
            )}
            right={() => (
              <IconButton
                icon={require('../../assets/icons/messageIcon.png')}
                size={24}
                className="bg-tertiary"
                iconColor={theme.colors.primary}
                // onPress={() => console.log('hello world')}
              />
            )}
            rightStyle={{marginRight: 20}}
          />
        </Card>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UserCard;

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import {useSelectedLanguage} from '../../hooks/useSetLanguage';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const UserMeetings = ({rightIcon}: any) => {
  const {language, setLanguage} = useSelectedLanguage();
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserMeetingsView' as never)}>
      <Card
        elevation={3}
        style={{
          backgroundColor: '#fff',
        }}>
        {/* LOGOUT */}
        <Card.Title
          title={t('myMeetings')}
          titleStyle={{
            textAlign: language === 'ar' ? 'right' : 'left',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            top: 5,
          }}
          left={() => (
            <IconButton
              rippleColor="#f1f1f1"
              className="bg-gray"
              icon={() => (
                <MaterialIcons name="meeting-room" size={27} color="gray" />
              )}
              iconColor="#111"
              size={30}
            />
          )}
          right={rightIcon}
          rightStyle={{marginRight: 20}}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default UserMeetings;

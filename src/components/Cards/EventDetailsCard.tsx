import React from 'react';
import {Card as NativePaperCard} from 'react-native-paper';
import {Image} from 'react-native';
import {useSelectedLanguage} from '../../hooks/useSetLanguage';

const EventDetailsCard = ({title, subTitle, icon, rightIcon}: any) => {
  const {language} = useSelectedLanguage();

  return (
    <NativePaperCard
      elevation={0}
      style={{
        backgroundColor: 'white',
        margin: 5,
        direction: language === 'ar' ? 'rtl' : 'ltr',
      }}>
      <NativePaperCard.Title
        style={{
          justifyContent: 'center',
        }}
        title={title}
        subtitle={subTitle}
        titleStyle={{
          textAlign: language === 'ar' ? 'right' : 'left',
          // color: theme.colors.primary,
          fontSize: 14,
          fontFamily: 'Poppins-Bold',
          left: 2,
        }}
        subtitleStyle={{
          textAlign: language === 'ar' ? 'right' : 'left',
          // color: theme.colors.primary,
          fontFamily: 'Poppins-Regular',
          left: 2,
        }}
        subtitleVariant="bodyMedium"
        left={() => (
          <Image
            style={{
              // backgroundColor: theme.colors.secondary,
              width: '100%',
              height: '100%',
            }}
            source={icon}
          />
        )}
        right={() => (
          <Image
            style={{
              borderRadius: 8,
              width: 60,
              height: 60,
              marginRight: 10,
              marginTop: 10,
            }}
            source={rightIcon}
          />
        )}
      />
    </NativePaperCard>
  );
};

export default EventDetailsCard;

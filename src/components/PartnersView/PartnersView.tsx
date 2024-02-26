import {View, Text, ScrollView} from 'react-native';

import React, {useState} from 'react';
import {useGetPartners} from '../../services/react-query-hooks/get-partners';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {Image} from 'expo-image';
import useImageurl from '../../hooks/useImageUrl';
import {useTranslation} from 'react-i18next';

export default function PartnersView() {
  const {t} = useTranslation();
  const theme = useTheme<any>();
  const {data, isLoading} = useGetPartners();
  const [numberOfLines, setNumberOfLines] = useState(2);

  if (isLoading && data) {
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator
        animating={true}
        size="large"
        color={theme.colors.primary}
      />
    </View>;
  }
  const imageUrl = useImageurl();

  return (
    <View className="my-4">
      <View className="bg-white ">
        <Text className="justify-center py-4 text-center font-PoppinsBold text-lg">
          {t('partners')}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          centerContent
          style={{
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{
            paddingVertical: 20,
            height: 200,
          }}>
          {data?.map((item: any, index: any) => (
            <View key={`partners${index}`} className="items-center rounded-lg ">
              {item?.attributes.partners_image_url ? (
                <Image
                  style={{
                    width: '100%',
                    height: 70,
                    aspectRatio: 3 / 2,
                  }}
                  contentFit="contain"
                  source={`${imageUrl}${item?.attributes.partners_image_url}`}
                />
              ) : (
                <Image
                  style={{width: 75, height: 70}}
                  source={require('../../assets/images/partners.png')}
                />
              )}
              {numberOfLines && (
                <View className="my-4 items-center">
                  <Text
                    className="text-center font-PoppinsSemibold text-[12px]"
                    style={{
                      width: 200,
                      color: theme.colors.secondary,
                    }}>
                    {item.attributes.name}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

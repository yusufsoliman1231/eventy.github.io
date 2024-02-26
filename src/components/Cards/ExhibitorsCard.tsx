import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {useGetExhibitors} from '../../services/react-query-hooks/get-exhibitors';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../../Theme';
import useImageurl from '../../hooks/useImageUrl';

const ExhibitorsCard = () => {
  const initialUrl = useImageurl();
  const {data, isLoading} = useGetExhibitors();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  }

  // console.log(data, 'ExhibitorsCard');
  return (
    <ScrollView className=" flex-1">
      {data?.data.map((item: any, index: any) => (
        <View
          key={`${index}Exhibitors`}
          className="mx-2 mt-8 min-h-[122px] items-center rounded-xl bg-white shadow-sm">
          <View className="-mt-4 h-24 w-24 items-center rounded-lg  border-gray bg-white shadow-lg">
            {initialUrl && (
              <Image
                style={{width: 80, height: 80, marginVertical: 2}}
                source={{
                  uri: `${initialUrl}${item.attributes.exhibitors_image_url}`,
                }}
              />
            )}
          </View>
          <View className="mt-2">
            <Text className="font-PoppinsBold">{item.attributes.name}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ExhibitorsCard;

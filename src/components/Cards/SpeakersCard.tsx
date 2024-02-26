import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'expo-image';
import useImageurl from '../../hooks/useImageUrl';

const SpeakersCard = ({speaker, index}: any) => {
  const initialUrl = useImageurl();

  return (
    <TouchableOpacity className=" mx-2 my-2 h-[169px] w-[179px] items-center justify-evenly rounded-lg bg-white">
      <View className="p-2">
        {initialUrl && (
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
            }}
            contentFit="cover"
            source={`${initialUrl}${speaker?.attributes.speaker_image_url}`}
          />
        )}
      </View>
      <View className="mt-2 items-center">
        <Text className="text-[14px] font-bold text-graydark">
          {speaker?.attributes.name}
        </Text>
        <Text className="w-[108px] text-center text-[9px] text-graydark">
          {speaker?.attributes.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpeakersCard;

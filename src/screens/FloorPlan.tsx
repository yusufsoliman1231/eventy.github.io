import {View, Text, Image} from 'react-native';
import React from 'react';
import useImageurl from '../hooks/useImageUrl';

const FloorPlan = ({floor_plan_details_images}: any) => {
  const imageUrl = useImageurl();

  return (
    <View className="flex-1">
      {floor_plan_details_images && floor_plan_details_images !== null ? (
        floor_plan_details_images.map((image: string, index: number) => (
          <View key={index} className="mx-2 mt-8 items-center">
            {/* <Text className="font- self-start font-PoppinsRegular text-secondary">
              Floor {index + 1}
            </Text> */}
            <Image source={{uri: `${imageUrl}${image}`}} />
          </View>
        ))
      ) : (
        <>
          <View className="mx-2 mt-8 items-center">
            <Text className="font- self-start font-PoppinsRegular text-secondary">
              First Floor
            </Text>
            <Image source={require('../assets/images/floorplaneimage.png')} />
          </View>
          <View className="mx-2 mt-8 items-center">
            <Text className="font- self-start font-PoppinsRegular text-secondary">
              Second Floor
            </Text>
            <Image source={require('../assets/images/floorplaneimage.png')} />
          </View>
        </>
      )}
    </View>
  );
};

export default FloorPlan;

import React, {useEffect, useState} from 'react';
import {Avatar, useTheme, ActivityIndicator} from 'react-native-paper';
import {useGetCurrentUser} from '../../services/react-query-hooks/get-current-user';
import {helperFirstLetter} from '../../utils/helperFirstLetter';
import useImageurl from '../../hooks/useImageUrl';
import {View} from 'react-native';

interface AvatarProps {
  avatarImage?: string | undefined;
  firstName?: string;
  lastName?: string;
  size?: number;
}

const UserAvatar: React.FC<AvatarProps> = ({
  avatarImage,
  size,
}: AvatarProps) => {
  const theme = useTheme();
  const [avatarSrc, setAvatarSrc] = useState('');
  const {data: currentUserData, isLoading: currentUserLoading} =
    useGetCurrentUser();
  const initialUrl = useImageurl();

  useEffect(() => {
    if (avatarImage) {
      setAvatarSrc(avatarImage);
    }
    if (currentUserData?.attributes.user_image_url) {
      setAvatarSrc(
        `${initialUrl}${currentUserData?.attributes.user_image_url}`,
      );
    } else {
      setAvatarSrc(''); // Default image or placeholder
    }
  }, [avatarImage, currentUserData?.attributes.user_image_url]);

  if (currentUserLoading) {
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
  if (avatarSrc) {
    return (
      <Avatar.Image
        source={{
          uri: `${initialUrl}${currentUserData?.attributes.user_image_url}`,
        }}
        size={size ? size : 50}
      />
    );
  } else {
    return (
      <Avatar.Text
        color="white"
        size={50}
        label={`${helperFirstLetter(
          currentUserData?.attributes.first_name,
        )}\n${helperFirstLetter(currentUserData?.attributes.last_name)}`}
      />
    );
  }
};

export default UserAvatar;

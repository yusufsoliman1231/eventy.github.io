import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {
  Card,
  Avatar,
  IconButton,
  Portal,
  Modal,
  Button,
  useTheme,
  TextInput,
  ActivityIndicator,
  SegmentedButtons,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import QRCODE from '../hooks/QRCODE';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../hooks/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import {useEditeProfileMutation} from '../services/react-query-hooks/post-edite-profile';
import UserAvatar from '../components/Avatar/Avatar';
import {useGetCurrentUser} from '../services/react-query-hooks/get-current-user';
import useImageurl from '../hooks/useImageUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelectedLanguage} from '../hooks/useSetLanguage';
import {useTranslation} from 'react-i18next';
import UserMeetings from '../components/UserMeetings/UserMeetingsCard';

const ProfileScreen = () => {
  const {mutate, data, isSuccess} = useEditeProfileMutation();
  const {
    data: currentUserData,
    isLoading: currentUserLoading,
    isFetched: currentUserFetched,
    refetch,
  } = useGetCurrentUser();
  const theme = useTheme<any>();
  const {user, signout} = useAuth();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [productQRref, setProductQRref] = useState();
  const initialUrl = useImageurl();
  const [segmantValue, setSegmantValue] = useState<string | string[]>('');
  const {language, setLanguage} = useSelectedLanguage();
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    image: '',
  });

  const rightIcon = () => (
    <AntDesign name={language === 'ar' ? 'left' : 'right'} size={28} />
  );
  useEffect(() => {
    if (!currentUserLoading && currentUserFetched) {
      setInputs({
        first_name: currentUserData.attributes.first_name || '',
        last_name: currentUserData.attributes.last_name || '',
        image: '',
      });
    }
  }, [!currentUserLoading && currentUserFetched]);

  useEffect(() => {
    const token = user;
    if (!token.access_token) {
      setTimeout(() => {
        navigation.navigate('SignIn' as never);
      }, 1500);
    }
  }, [user.access_token]);

  useEffect(() => {
    isSuccess && refetch();
  }, [isSuccess]);

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

  const handleAvatarPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setInputs({...inputs, image: result.assets[0].uri});
    }
  };

  const handleEditProfile = () => {
    const formData: any = new FormData();
    formData.append(
      'image',
      JSON.stringify({
        uri: inputs.image,
        type: 'image/png', // Set the 'Content-Type' of the image part to 'image/png'
        name: 'profile.png', // Set the image name to 'profile.png'
      }),
    );
    formData.append('first_name', inputs.first_name);
    formData.append('last_name', inputs.last_name);
    mutate(formData);
    setModalVisible1(false);
    AsyncStorage.setItem('userName', inputs.first_name);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative gap-10  p-2">
        {/*PROFILE DETAILS WITH QR SCANNER CARD */}
        <Card
          pointerEvents="box-only"
          elevation={3}
          style={{
            backgroundColor: '#fff',
            paddingVertical: 30,
          }}>
          <Card.Title
            title={`${currentUserData?.attributes.first_name} ${currentUserData?.attributes.last_name}`}
            subtitle={`${currentUserData?.attributes.position || 'position'}\n${
              currentUserData?.attributes.company || 'company'
            }`}
            titleStyle={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              left: 33,
            }}
            subtitleStyle={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              left: 33,
              color: theme.colors.gray,
            }}
            subtitleNumberOfLines={10}
            left={isAcitve => (
              <View className="">
                <TouchableOpacity onPress={() => setModalVisible1(true)}>
                  <UserAvatar avatarImage={inputs.image} size={80} />
                </TouchableOpacity>
              </View>
            )}
            right={() => (
              <IconButton
                iconColor="#111"
                icon={'qrcode'}
                size={50}
                onPress={() => setModalVisible(true)}
              />
            )}
            rightStyle={{marginRight: 20}}
          />
        </Card>
        {/* RESET PASSWORD CARD */}

        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword' as never)}>
          <Card
            elevation={3}
            style={{
              backgroundColor: '#fff',
            }}>
            <Card.Title
              title={t('resetPassword')}
              titleStyle={{
                textAlign: language === 'ar' ? 'right' : 'left',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                top: 5,
              }}
              left={isAcitve => (
                <IconButton
                  rippleColor="#f1f1f1"
                  className="bg-gray"
                  icon={() => (
                    <MaterialIcons
                      name="app-registration"
                      size={27}
                      color="gray"
                    />
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

        {/* LANGUAGE */}

        <Card
          elevation={3}
          style={{
            backgroundColor: '#fff',
          }}>
          <Card.Title
            title={t('language')}
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
                  <MaterialIcons name="language" size={27} color="gray" />
                )}
                iconColor="#111"
                size={30}
              />
            )}
            right={() => (
              <SegmentedButtons
                style={{padding: 12, direction: 'ltr'}}
                value={language as any}
                onValueChange={setSegmantValue}
                theme={{
                  roundness: 2,
                  colors: {secondaryContainer: theme.colors.primary},
                }}
                buttons={[
                  {
                    value: 'en',
                    label: 'EN',
                    checkedColor: theme.colors.secondary,
                    onPress: () => {
                      setLanguage('en');
                    },
                  },
                  {
                    value: 'ar',
                    label: 'AR',
                    checkedColor: theme.colors.secondary,
                    onPress: () => {
                      setLanguage('ar');
                    },
                  },
                ]}
              />
            )}
          />
        </Card>

        {/* USER MEETINGS */}
        <UserMeetings rightIcon={rightIcon} />

        {/* LOGOUT */}

        <TouchableOpacity onPress={() => signout()}>
          <Card
            elevation={3}
            style={{
              backgroundColor: '#fff',
              marginBottom: 16,
            }}>
            {/* LOGOUT */}
            <Card.Title
              title={t('logout')}
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
                    <MaterialIcons name="logout" size={27} color="gray" />
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
      </View>
      {/* THE MODAL QR MODAL */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            marginHorizontal: 20,
            backgroundColor: '#fff',
            borderRadius: 2,
            height: '80%',
          }}>
          <View className="px-10">
            <UserAvatar avatarImage={inputs.image} size={80} />
          </View>
          <View className="my-8 items-center gap-10">
            <QRCODE
              value={JSON.stringify({
                currentId: user?.id,
              })}
              getRef={(c: any) => setProductQRref(c)}
            />
            <View className="w-full flex-row justify-center gap-2">
              <Button
                mode="contained"
                icon="share-variant"
                className="rounded-sm p-4"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
                // onPress={() => navigation.navigate('ChatScreen' as never)}
              >
                <Text className="font-PoppinsRegular text-white">Share</Text>
              </Button>
              <Button
                className="items-center justify-center rounded-sm p-4"
                icon="download"
                mode="outlined"
                // onPress={() => navigation.navigate('ChatScreen' as never)}
                children={undefined}
              />
            </View>
          </View>
        </Modal>
      </Portal>
      {/* THE MODAL EDITE PROFILE */}
      <Portal>
        <Modal
          visible={modalVisible1}
          onDismiss={() => setModalVisible1(false)}
          contentContainerStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
            width: 300,
            padding: 30,
            alignSelf: 'center',
          }}>
          {currentUserData && (
            <View className="flex-col items-center">
              <TouchableOpacity onPress={() => handleAvatarPress()}>
                <Avatar.Image
                  source={{
                    uri: inputs.image
                      ? inputs.image
                      : `${initialUrl}${currentUserData?.attributes.user_image_url}`,
                  }}
                  size={150}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  marginVertical: 10,
                  backgroundColor: '#fff',
                }}
                theme={{
                  roundness: 10,
                }}
                value={inputs.first_name}
                mode="outlined"
                onChangeText={text => setInputs({...inputs, first_name: text})}
              />
              <TextInput
                theme={{
                  roundness: 10,
                }}
                style={{
                  marginVertical: 10,
                  backgroundColor: '#fff',
                }}
                value={inputs.last_name}
                mode="outlined"
                onChangeText={text => setInputs({...inputs, last_name: text})}
              />
              <Button
                className="mt-8"
                onPress={() => handleEditProfile()}
                mode="contained">
                Update Profile
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

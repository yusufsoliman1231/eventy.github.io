import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Platform, Text} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMediaQuery} from 'react-responsive';
import {theme} from '../../Theme';
import {useGetEventInfo} from '../../services/react-query-hooks/get-event-info ';
import {Image} from 'expo-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useResetPassword} from '../../services/react-query-hooks/use-reset-password';
import useImageurl from '../../hooks/useImageUrl';

interface ValuesType {
  password: string;
  password_confirmation: string;
}

const initialValues: ValuesType = {
  password: '',
  password_confirmation: '',
};

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(5, 'Too Short!').required('Required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Passwords must match')
    .required('Password confirmation is required'),
});
const web = Platform.OS === 'web';

const ResetPassword = () => {
  const initialUrl = useImageurl();
  const navigation = useNavigation();
  const {
    data: eventData,
    isLoading: eventLoading,
    isSuccess: eventSuccess,
  } = useGetEventInfo();

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });
  const {
    mutate: changePassword,
    isLoading,
    error,
    isError,
    isSuccess,
    data: resetPasswordData,
  } = useResetPassword();

  const handleResetPassword = async (values: ValuesType, {setErrors}: any) => {
    changePassword(values);
  };

  return (
    <ImageBackground
      resizeMode={web ? 'stretch' : 'contain'}
      style={{flex: 1, width: '100%', height: '100%', backgroundColor: '#fff'}}
      source={require('../../assets/images/loginImage.png')}>
      <View
        className={`mx-4 flex-1 justify-center space-y-6 mb-10${
          web ? 'items-center' : ''
        }`}>
        {initialUrl && (
          <Image
            style={{
              width: web ? 120 : 90,
              height: web ? 120 : 90,
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            source={`${initialUrl}${eventData?.attributes.event_logo_image_url.logo}`}
          />
        )}
        <Text className="-mb-4 self-center font-PoppinsBold text-[24px]">
          Reset Password
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={handleResetPassword}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className={`${isTabletOrMobileDevice ? 'mx-[38%]' : 'mx-4'}`}>
              <TextInput
                className="bg-white"
                left={
                  <TextInput.Icon
                    icon="account"
                    size={22}
                    color={theme.colors.gray}
                  />
                }
                mode="outlined"
                secureTextEntry
                label={web ? '' : 'password'}
                placeholder="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.password && touched.password)}>
                {errors.password}
              </HelperText>
              <TextInput
                className="bg-white"
                left={
                  <TextInput.Icon
                    icon="lock"
                    size={22}
                    color={theme.colors.gray}
                  />
                }
                mode="outlined"
                label={web ? '' : 'password_confirmation'}
                placeholder="password confirmation"
                onChangeText={handleChange('password_confirmation')}
                onBlur={handleBlur('password_confirmation')}
                value={values.password_confirmation}
                secureTextEntry
                error={Boolean(
                  errors.password_confirmation && touched.password_confirmation,
                )}
              />
              <HelperText
                type="error"
                visible={Boolean(
                  errors.password_confirmation && touched.password_confirmation,
                )}>
                {errors.password_confirmation}
              </HelperText>
              <Button
                className="mt-6 py-1"
                loading={isLoading}
                disabled={isLoading}
                mode="contained"
                //@ts-ignore
                onPress={handleSubmit}>
                Reset Password
              </Button>
              <TouchableOpacity
                className="mt-4 self-center"
                onPress={() => navigation.navigate('SignIn' as never)}>
                {/* <Text className="font-PoppinsRegular text-secondary">
                  Go back to login
                </Text> */}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default ResetPassword;

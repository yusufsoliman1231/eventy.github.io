import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  HelperText,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import * as Linking from 'expo-linking';
import {useAuth} from '../../hooks/AuthProvider';
import {useLoginMutation} from '../../services/react-query-hooks/use-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMediaQuery} from 'react-responsive';
import {theme} from '../../Theme';
import {useGetEventInfo} from '../../services/react-query-hooks/get-event-info ';
import {Image} from 'expo-image';
import {useNavigation} from '@react-navigation/native';
import useImageUrl from '../../hooks/useImageUrl';
import Toast from 'react-native-toast-message';
import useAsyncStorage from '../../hooks/useAsyncStorage';

interface ValuesType {
  email: string;
  password: string;
}

const initialValues: ValuesType = {
  email: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
});
const web = Platform.OS === 'web';

const SignIn = () => {
  const [localStorageToken, setLocalStorageToken]: any = useAsyncStorage(
    'token',
    '',
  );

  const navigation = useNavigation();
  const [subDomain, setSubDomain] = useState<any>();
  const [eventUuid, setEventUuid] = useState<any>();
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const {
    data: eventData,
    isLoading: eventLoading,
    isSuccess: eventSuccess,
  } = useGetEventInfo();

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(min-device-width: 1024px)',
  });
  const {signin} = useAuth();
  const {
    mutate: queryLogin,
    isLoading,
    error,
    isError,
    isSuccess,
    data: loginData,
  } = useLoginMutation();

  const initialUrl = useImageUrl();
  const [reload, setReload] = useState(false);

  const reloadPage = () => {
    setReload(!reload);
  };

  useEffect(() => {
    AsyncStorage.multiGet(['subdomain', 'uuid']).then(values => {
      setSubDomain(values[0][1]);
      setEventUuid(values[1][1]);
      if (subDomain && eventUuid) {
        reloadPage();
      }
    });
  }, [subDomain, eventUuid]);

  const handleLogin = async (values: ValuesType, {setErrors}: any) => {
    let reqObj = Object.assign({}, values, {
      subdomain_name: subDomain,
      event_uuid: eventUuid,
    }) as any | unknown;
    queryLogin(reqObj);
  };

  useEffect(() => {
    const settingAuth = async () => {
      if (isSuccess) {
        const access_token = await loginData?.headers['access-token'];
        setLocalStorageToken(access_token);
        const userId = await AsyncStorage.getItem('userId');
        const userName = await AsyncStorage.getItem('userName');
        signin({
          access_token,
          id: userId,
          name: userName,
        });
      }
    };
    settingAuth();
  }, [isSuccess]);
  // TOASTING COMPONENT
  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Login Error',
        text2: 'Incorrect login credentials. Please try again.',
      });
    }
    if (isSuccess) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Successful',
        text2: 'You have successfully logged in.',
      });
    }
  }, [isError, isSuccess]);

  if (eventLoading) {
    return (
      <ActivityIndicator
        className="m-auto"
        size={'large'}
        animating={true}
        color={theme.colors.primary}
      />
    );
  }

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
            contentFit="contain"
            source={`${initialUrl}${eventData?.attributes.event_logo_image_url.logo}`}
          />
        )}

        {/* <Text className="-mb-4 self-center font-PoppinsBold text-[24px]">
          welcome back
        </Text> */}
        <Text className="mb-2 self-center font-PoppinsRegular text-graydark">
          You should have receive password by email
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}>
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
                label={web ? '' : 'Email'}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                error={Boolean(errors.email && touched.email)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.email && touched.email)}>
                {errors.email}
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
                label={web ? '' : 'Password'}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                error={Boolean(errors.password && touched.password)}
              />
              <HelperText
                type="error"
                visible={Boolean(errors.password && touched.password)}>
                {errors.password}
              </HelperText>
              <Button
                className="mt-6 py-1"
                loading={isLoading}
                disabled={isLoading}
                mode="contained"
                //@ts-ignore
                onPress={handleSubmit}>
                Login
              </Button>
              <TouchableOpacity
                disabled={true}
                className="mt-4 self-center "
                onPress={() => navigation.navigate('ResetPassword' as never)}>
                <Text className="font-PoppinsRegular text-gray">
                  Reset Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-4 self-center "
                onPress={() => {
                  web
                    ? window.open(
                        `${initialUrl}${eventData?.attributes.event_logo_image_url.registration_url}`,
                        '_blank',
                      )
                    : Linking.openURL(
                        `${initialUrl}${eventData?.attributes.event_logo_image_url.registration_url}`,
                      );
                }}>
                <Text className="font-PoppinsRegular">
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Toast />
      </View>
    </ImageBackground>
  );
};

export default SignIn;

// Add grant_type value to obj
//LOGIN FUNCTION
// const handleLogin = (values: ValuesType, {setErrors}: any) => {
//   let reqObj = Object.assign({}, values, {
//     subdomain_name: 'sc',
//     event_uuid: 'de41caa9-9441-5a6c-8c45-6228ebd2431f',
//   }) as any | unknown;
// Service request
// login(reqObj)
//   .then(res => {
//     if ((res as any).data?.user?.access_token) {
//       const {id, name, email, access_token} = (res as any).data.user;
//       signin({
//         id,
//         name,
//         email,
//         access_token,
//       });
//     }
//     console.log(res, 'hello from res');
//   })
//   .catch(e => {
//     if (e.response?.data?.errors) {
// let result = transformToFormikErrors(e.response.data.errors);
// setErrors(result);
//       console.log(e);
//     }
//   });
// console.log(reqObj, 'hello from reqObj');
// };

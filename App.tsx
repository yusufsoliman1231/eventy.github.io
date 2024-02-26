import {useEffect, useLayoutEffect, useState} from 'react';
import './global.css';
import './src/i18n';

// react navigation
import RootStack from './src/navigators/RootStack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider, useAuth} from './src/hooks/AuthProvider';
import * as Linking from 'expo-linking';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';

// custom fonts
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {Platform, View} from 'react-native';
import {useMediaQuery} from 'react-responsive';
import useAsyncStorage from './src/hooks/useAsyncStorage';
import {http} from './src/services/http';
import {API_ENDPOINTS} from './src/services/api-endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelectedLanguage} from './src/hooks/useSetLanguage';
import i18n from './src/i18n';
import {storage} from './src/utils/storage';

// import SplashScreens from './src/components/SplashScreen/SplashScreen';

const queryClient = new QueryClient();

export default function App() {
  const [eventData, setData] = useState<any>(null);
  const {language, setLanguage} = useSelectedLanguage();
  const [eventLoading, setEventLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [theme, setTheme] = useState<any>(DefaultTheme);
  const web = Platform.OS === 'web';
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(min-device-width: 1180px)',
  });

  const [subdomain, setSubdomain] = useAsyncStorage('subdomain', '');
  const [uuid, setUuid] = useAsyncStorage('uuid', '');
  const url = window.location.href;

  const {hostname, path, queryParams} = Linking.parse(url);
  const {subdomain_name, event_uuid}: any = queryParams;

  if (subdomain_name && event_uuid) {
    //@ts-ignore
    setSubdomain(subdomain_name);
    //@ts-ignore
    setUuid(event_uuid);
  }

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const loadResourcesAsync = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      // load fonts
      await Font.loadAsync({
        'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Semibold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
        CamptonMedium: require('./src/assets/fonts/CamptonMedium.otf'),
      });
      // wait a little bit to simulate a more realistic splash screen experience
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    async function getEventInfo() {
      const uuid2 = await AsyncStorage.getItem('uuid');

      const {data} = await http.get(
        `${API_ENDPOINTS.UUID}?event_uuid=${uuid2}`,
      );
      // console.log('Response data:', data); // Check the response data
      if (!data) {
        throw new Error('No data received');
      }
      return data;
    }
    getEventInfo()
      .then(data => {
        setData(data.data);
        storage.set('E-I', data?.data?.id);
        setEventLoading(false);
      })
      .catch(error => {
        setError(error);
        setEventLoading(false);
      });
  }, []);

  useEffect(() => {
    loadResourcesAsync();
  }, []);

  useEffect(() => {
    if (eventData) {
      setTheme({
        ...DefaultTheme,
        roundness: 2,

        colors: {
          ...DefaultTheme.colors,
          primary: eventData?.attributes.primary_color,
          secondary: eventData?.attributes.secondary_color,
          gray: '#BDBDBD',
          background: '#F5F5F5',
          surface: '#F5F5F5',
          darkGray: '#333333',
          semiGray: '#707070',
          online: '#009F8B',
          secondaryContainer: '#F5F5F5',
          surfaceVariant: '#F5F5F5',
          primaryContainer: '#F5F5F5',
        },
      });
    }
  }, [eventData]);

  if (!isLoadingComplete && eventLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <View
            //@ts-ignore
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={
              web && isTabletOrMobileDevice
                ? {
                    flex: 1,
                    maxWidth: 1180,
                    minWidth: '50%',
                    marginHorizontal: 'auto',
                  }
                : {
                    flex: 1,
                  }
            }>
            <RootStack
              // @ts-ignore
              urlProps={
                (subdomain_name && event_uuid) || (subdomain && uuid)
                  ? true
                  : false
              }
            />
          </View>
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

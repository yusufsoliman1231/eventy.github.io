import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useImageurl() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('subdomain')
      .then(subdomain => {
        if (subdomain) {
          setUrl(`https://${subdomain}.eventy.cloud`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [url]);
  return url;
}

export default useImageurl;

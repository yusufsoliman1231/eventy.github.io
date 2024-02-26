import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../hooks/AuthProvider';

export interface LoginInputType {
  email: string;
  password: string;
  event_uuid?: string;
  subdomain_name?: string;
}

async function login(input: LoginInputType) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

export const useLoginMutation = () => {
  const {setUser} = useAuth();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data, _) => {
      const id = JSON.stringify(data?.data.data.user.id);
      const name = data?.data.data.user.first_name;
      AsyncStorage.setItem('userId', id);
      AsyncStorage.setItem('userName', name);
      // const storedId: string | null | any = AsyncStorage.getItem('userId');
      // if (storedId !== id) {
      //   location.replace('/MessagesScreen');
      // }
    },
    onError: data => {
      console.log(data, 'login error response');
    },
  });
};

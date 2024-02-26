import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface resetPasswordType {
  password: string;
  password_confirmation: string;
}

async function resetPassword(input: resetPasswordType) {
  console.log(input, ' resetPassword input');
  return http.patch(API_ENDPOINTS.RESET_PASSWORD, input);
}

export const useResetPassword = () => {
  return useMutation((input: resetPasswordType) => resetPassword(input), {
    onError: data => {
      console.log(data, 'resetPassword error response');
    },
  });
};

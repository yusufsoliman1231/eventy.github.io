import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

export const fetchEventUserChats = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.EVENT_USER_CHAT);
  return data.data;
};

export const useGetEventUserChats = () => {
  return useQuery([`EVENT_USER_CHAT`], fetchEventUserChats, {
    enabled: false,
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};

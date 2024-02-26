import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchCurrentEvent = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.CURRENT_EVENT);
  return data?.data;
};

export const useGetCurrentEvent = () => {
  return useQuery([`CURRENCT_EVENT`], fetchCurrentEvent, {
    staleTime: 60 * 1000 * 10,
    cacheTime: 60 * 1000 * 10,
  });
};

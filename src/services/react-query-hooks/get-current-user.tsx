import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchCurrentUser = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.CURRENT_USER);
  return data?.data;
};

export const useGetCurrentUser = () => {
  return useQuery([`CURRENT_USER`], fetchCurrentUser);
};

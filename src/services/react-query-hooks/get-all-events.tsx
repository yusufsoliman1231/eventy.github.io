import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchAllEvents = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.ALL_EVENTS);
  return data;
};

export const useGetAllEvents = () => {
  return useQuery([`ALL_EVENTS`], fetchAllEvents);
};

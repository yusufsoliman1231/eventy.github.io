import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchAgenda = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {data} = await http.get(API_ENDPOINTS.AGENDA);
  return data;
};

export const useGetAgenda = () => {
  return useQuery([`AGENDA`], fetchAgenda);
};

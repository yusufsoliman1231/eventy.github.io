import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';

const fetchSearchResults = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const {value, debouncedSearchResults} = _params;
  // console.log(value, debouncedSearchResults, 'params query');

  // console.log(
  //   `${API_ENDPOINTS.EVENET_USERS}?filter=${JSON.stringify(value)}`,
  //   ' the link',
  // );
  const {data} = await http.get(
    `${API_ENDPOINTS.EVENET_USERS}?filter=&search=${
      debouncedSearchResults ? debouncedSearchResults : ''
    }`,
  );

  return data;
};

export const useGetSearchResults = (options: any) => {
  return useQuery([`SEARCH_RESULTS`, options], fetchSearchResults, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};

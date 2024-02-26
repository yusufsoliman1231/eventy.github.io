import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';
import {storage} from '../../utils/storage';

const fetchMeetingCalendar = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const eventID = storage.getString('E-I');

  const {data} = await http.get(
    `events/${eventID}/${API_ENDPOINTS.GET_MEETING_CALANDER}`,
  );
  return data.data;
};

export const useGetMeetingCalendar = () => {
  return useQuery([`MEETING_CALENDAR`], fetchMeetingCalendar, {
    staleTime: 60 * 1000 * 5,
    cacheTime: 60 * 1000 * 5,
  });
};

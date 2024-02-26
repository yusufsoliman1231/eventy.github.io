import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';
import {storage} from '../../utils/storage';
export interface PostMeetingCalendarInput {
  selected_start_date: string;
  selected_end_date: string;
  receiver_id: number;
}

function postMeetingsCalendar(input: PostMeetingCalendarInput) {
  const eventID = storage.getString('E-I');

  console.log(eventID, 'eventID');
  return http.post(
    `events/${eventID}/${API_ENDPOINTS.POST_MEETING_CALANDER}`,
    input,
    {},
  );
}

export const usePostMeetingCalendar = () => {
  return useMutation(
    (input: PostMeetingCalendarInput) => postMeetingsCalendar(input),
    {
      onSuccess: (data, _) => {
        console.log(data, 'success data from edite profile mutation');
      },
      onError: data => {
        console.log(data, 'EditeProfile error response');
      },
    },
  );
};

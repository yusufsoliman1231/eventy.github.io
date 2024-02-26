import {API_ENDPOINTS} from '../api-endpoints';
import {useMutation} from '@tanstack/react-query';
import {http} from '../http';

async function requestChat(params: any) {
  const {message, chatWithId, receiverId} = params;
  // console.log(message, chatWithId, receiverId, 'params');
  // console.log(
  //   `${API_ENDPOINTS.REQUEST_CHAT}?receiver_id=${
  //     chatWithId ? chatWithId : null || receiverId ? receiverId : null
  //   }&message="${message}"`,
  //   'url',
  // );
  return http.post(
    `${API_ENDPOINTS.REQUEST_CHAT}?receiver_id=${
      chatWithId ? chatWithId : null || receiverId ? receiverId : null
    }&message="${message}"`,
  );
}

export const usePostRequestChat = () => {
  return useMutation((id: any) => requestChat(id), {
    onError: data => {
      console.log(data, 'chat request error response');
    },
  });
};

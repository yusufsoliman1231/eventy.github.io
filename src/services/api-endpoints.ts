export const API_ENDPOINTS = {
  EVENET_USERS: '/event_users', // this for results
  EVENET_USER: '/event_user', //this for params
  CURRENT_USER: 'event_user/current_user',
  LOGIN: '/event_users/sign_in',
  AGENDA: '/agendas',
  CURRENT_EVENT: 'events/current_event',
  GET_MATCH_USERS: '/event_user/get_match_users',
  PARTNERS: '/partners',
  EXIHIBITORS: '/exhibitors',
  UUID: '/events/event_info',
  EVENT_USER_CHAT: '/event_user/chats',
  CHAT_REQUESTS: '/event_user/chat_requests',
  CHAT_SEND: '/event_user/chat_requests_sent',
  REQUEST_CHAT: '/event_user/request_chat',
  ACCEPT_CHAT: '/event_user/accept_request_chat?chat_id',
  REJECT_CHAT: '/event_user/reject_request_chat?chat_id',
  CHAT_INFO: '/event_user/chat_info',
  RESET_PASSWORD: 'event_users/passwords',
  EDIT_PROFILE: '/event_user/edit_user',
  ALL_EVENTS: 'events/all_events',
  POST_MEETING_CALANDER: 'user_meeting_calendars',
  GET_MEETING_CALANDER: 'user_meeting_calendars',
};

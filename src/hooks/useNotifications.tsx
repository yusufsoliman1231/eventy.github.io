import {useEffect, useMemo, useState} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import useAsyncStorage from './useAsyncStorage';
import {useAuth} from './AuthProvider';

interface Message {
  notifications?: any;
  message_notifications?: any;
  message?: any;
  notification?: any;
}

interface NotificationsFunction {
  (arg: {
    messageNotifications?: any;
    seenNotifications?: any;
    messageBadge?: boolean;
  }): void;
}

const useNotifications = () => {
  const [subdomain, setSubdomain] = useAsyncStorage('subdomain', '');
  const [notification, setNotifications] = useState<any[]>([]);
  const [seenNotificationsHook, setSeenNotificationsHook] = useState<any[]>([]);
  const {user, notificaions} = useAuth();

  const socketUrl =
    user && subdomain
      ? `wss://${subdomain}.eventy.cloud/cable?subdomain_name=${subdomain}&token=${user.access_token}`
      : null;

  //   console.log(socketUrl, 'socketUrl');

  const {lastMessage, sendMessage, readyState} = useWebSocket(socketUrl, {
    onOpen: () =>
      sendMessage(
        JSON.stringify({
          command: 'subscribe',
          identifier: '{"channel":"AppNotificationsChannel"}',
        }),
      ),
  });

  useEffect(() => {
    if (lastMessage?.data) {
      const {message} = JSON.parse(lastMessage.data) as {message: Message};
      const messageNotifications = message?.notifications;
      if (message?.notifications) {
        setNotifications(messageNotifications);
      }
      if (message?.message_notifications) {
        notificaions({
          messageNotifications: message?.message_notifications,
        });
      }

      if (message?.message) {
        setSeenNotificationsHook(message?.message);
      }
    }
    // TO TEST THE HOOK IS WORKING
    // console.log('renderd useNotifications');
  }, [lastMessage, user, subdomain]);

  return {
    lastMessage,
    sendMessage,
    readyState,
    notification,
    seenNotificationsHook,
  };
};

export default useNotifications;

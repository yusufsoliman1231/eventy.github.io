import React, {useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge, List, Modal, Portal} from 'react-native-paper';
import {formatDate} from '../../utils/dateCheck';

const Notifications = ({notification}: any) => {
  const [visible, setVisible] = useState(false);
  const _showModal = () => setVisible(true);
  const _hideModal = () => setVisible(false);

  return (
    <View className="relative flex-1">
      <Icon
        name="bell"
        style={{marginRight: 12, top: 12}}
        size={28}
        color="#fff"
        onPress={_showModal}
      />
      {notification.length > 0 ? (
        <Badge size={16} style={{position: 'absolute', top: 4, right: 4}}>
          {notification?.length}
        </Badge>
      ) : null}
      <Portal
        theme={{
          colors: {
            backdrop: 'transparent',
          },
        }}>
        <Modal
          contentContainerStyle={{
            right: 0,
            maxHeight: '80%',
            top: 20,
            minWidth: 500,
            position: 'absolute',
            maxWidth: '50%',
            backgroundColor: '#fff',
            paddingHorizontal: 8,
            marginHorizontal: 8,
            borderRadius: 10,
          }}
          visible={visible}
          onDismiss={_hideModal}>
          <View className="h-32 py-4">
            {notification?.map((item: any, index: any) => (
              <List.Item
                onPress={() => {
                  console.log(item);
                  // Update the read status of the notification
                  // const updatedNotifications = [...notifications];
                  // updatedNotifications[index] = {
                  //   ...item,
                  //   read: true,
                  // };
                  // setNotifications(updatedNotifications);
                }}
                key={`notification-${index}`}
                title={item?.message}
                description={formatDate(item?.created_at)}
                left={() => <List.Icon icon="bell" />}
                style={{paddingHorizontal: 20}}
              />
            ))}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Notifications;

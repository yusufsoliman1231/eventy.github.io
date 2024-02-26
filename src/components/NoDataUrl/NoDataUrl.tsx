import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {useGetAllEvents} from '../../services/react-query-hooks/get-all-events';

const NoDataUrl = () => {
  const {
    data: allEventData,
    isLoading: allEventLoading,
    isSuccess: allEventSucc,
  } = useGetAllEvents();

  console.log(allEventData, 'allEventData');
  let eventDataArray: any = [];

  if (allEventData) {
    eventDataArray = Object.keys(allEventData).map(key => ({
      id: key,
      event: allEventData[key],
    }));
  }

  return (
    <FlatList
      data={eventDataArray}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text className="text-center font-PoppinsBold font-semibold">
            {item.id}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 70,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 30,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default NoDataUrl;

import {useState, useEffect} from 'react';
import {http} from '../http';
import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '../api-endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '../../hooks/useAsyncStorage';

const fetchEventInfo = async ({queryKey}: any) => {
  const [_key, _params] = queryKey;
  const uuid2 = await AsyncStorage.getItem('uuid');
  const {data} = await http.get(`${API_ENDPOINTS.UUID}?event_uuid=${uuid2}`);
  return data?.data;
};

export const useGetEventInfo = () => {
  const [uuid, setUuid] = useAsyncStorage('uuid', '');
  return useQuery([`EVENT_INFO`, {uuid}], fetchEventInfo, {
    cacheTime: 60000,
    staleTime: 60000,
  });
};

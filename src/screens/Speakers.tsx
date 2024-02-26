import React, {FC} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import SpeakersCard from '../components/Cards/SpeakersCard';
import {useGetAgenda} from '../services/react-query-hooks/get-agenda';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../Theme';

const Speakers: FC = () => {
  const {data, isLoading} = useGetAgenda();

  if (isLoading) {
    <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
        }}
        data={data?.included}
        renderItem={({item}) => <SpeakersCard speaker={item} />}
      />
    </SafeAreaView>
  );
};

export default Speakers;

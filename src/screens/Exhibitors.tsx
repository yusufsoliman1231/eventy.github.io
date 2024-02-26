import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import ExhibitorsCard from '../components/Cards/ExhibitorsCard';

const Exhibitors = () => {
  return (
    <SafeAreaView className="flex-1">
      <ExhibitorsCard />
    </SafeAreaView>
  );
};

export default Exhibitors;

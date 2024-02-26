import React from 'react';
import {View, Text} from 'react-native';

const ErrorPage: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-start bg-secondary">
      <Text className="text-red-500 mb-4 text-4xl">Error 404</Text>
      <Text className="text-gray-700 text-xl">Page not found</Text>
    </View>
  );
};

export default ErrorPage;

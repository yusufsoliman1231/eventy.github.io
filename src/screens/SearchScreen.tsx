import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {IconButton, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import UserCard from '../components/Cards/UserCard';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  return (
    <View>
      <Searchbar
        value={value}
        onChangeText={query => setValue(query)}
        placeholder="Search for user"
        placeholderTextColor={'#505050'}
        style={{
          backgroundColor: '#fff',
          borderRadius: 4,
          marginHorizontal: 6,
          marginVertical: 14,
          borderColor: '#BDBDBD',
          borderWidth: 1,
        }}
        inputStyle={{
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          color: '#505050',
          marginVertical: -2,
        }}
        right={props => (
          <IconButton
            className="w-20"
            icon="qrcode-scan"
            onPress={() => {
              navigation.navigate('QrScreen' as never);
            }}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;

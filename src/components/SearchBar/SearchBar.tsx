TODO: "Handle the name and the route for this screen it's searchBar inside searchBar folder it should talk about the network";

import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  useTheme,
  Button,
  IconButton,
  Searchbar,
  Card,
  Avatar,
  Portal,
  ActivityIndicator,
  Modal,
  List,
  Divider,
  Checkbox,
  Tooltip,
} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import {useDebounce} from '@uidotdev/usehooks';
import {useGetSearchParams} from '../../services/react-query-hooks/get-search-params';
import {useGetSearchResults} from '../../services/react-query-hooks/get-search-results';
import {useGetMatchUsers} from '../../services/react-query-hooks/get-match-users';
import {useAuth} from '../../hooks/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import countryList from 'react-select-country-list';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {helperFirstLetter} from '../../utils/helperFirstLetter';
import {useSelectedLanguage} from '../../hooks/useSetLanguage';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';

const jobTitles = [
  'CEO',
  'CTO',
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UI/UX Designer',
  'Sales Representative',
  'Marketing Manager',
  'Project Manager',
  'Business Analyst',
  'HR Manager',
  'Financial Analyst',
  'Operations Manager',
  'Accountant',
  'Graphic Designer',
  'Content Writer',
  'Customer Support Specialist',
  'Quality Assurance Engineer',
  'Network Administrator',
  'Systems Analyst',
  'Database Administrator',
  'IT Manager',
  'Front-end Developer',
  'Back-end Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Cybersecurity Analyst',
  'Data Engineer',
  'Machine Learning Engineer',
  'Blockchain Developer',
  'Product Owner',
  'Scrum Master',
  'Sales Manager',
  'Business Development Manager',
  'UX Researcher',
  'Technical Writer',
  'Data Analyst',
  'IT Consultant',
  'UI/UX Developer',
  'Systems Engineer',
  'Network Engineer',
  'IT Support Specialist',
  'Digital Marketing Specialist',
  'Social Media Manager',
  'E-commerce Manager',
  'UI Designer',
  'UX Designer',
  'Software Tester',
  'Data Entry Specialist',
  'SEO Specialist',
];

const companies = ['Mothmerat group', 'solution_circle'];

const SearchBar = () => {
  const DURATION_MEDIUM = 100;
  const DURATION_LONG = 100;
  const {t} = useTranslation();
  const {language} = useSelectedLanguage();
  const theme = useTheme<any>();
  const navigation = useNavigation();
  const {user} = useAuth();
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchResults = useDebounce(query, 500);
  const [value, setValue] = useState({
    country: '',
    position: '',
    company: '',
  });

  const countryApi = useMemo(() => countryList().getData(), []);
  const web = Platform.OS === 'web';

  //REACT QUERY HOOKS
  const {
    data: searchResultsData,
    isLoading: searchResultsLoading,
    isError: searchResultsError,
  } = useGetSearchResults({value, debouncedSearchResults});
  const {
    data: searchParamsData,
    isLoading: searchParamsLoading,
    isError: searchParamsError,
  } = useGetSearchParams();
  const {
    data: matchUsersData,
    isLoading: matchUsersLoading,
    isError: matchUsersError,
  } = useGetMatchUsers();

  const handleSearch = (text: any) => {
    const formattedQuery = text.toLowerCase();
    setQuery(formattedQuery);
  };

  if (searchResultsError || matchUsersError) {
    location.reload();
  }
  TODO: 'handle the country model';
  // console.log(searchParamsData, ' searchParamsData');
  // console.log(searchResultsData?.data, ' searchResultsData?.data');
  function renderSearchBar() {
    return (
      <View className="mx-1">
        <Searchbar
          value={query}
          autoCorrect={false}
          clearButtonMode="always"
          autoCapitalize="none"
          onChangeText={e => handleSearch(e)}
          placeholder={t('searchForUser')}
          placeholderTextColor={'#505050'}
          style={{
            backgroundColor: '#fff',
            borderRadius: 4,
            marginHorizontal: 2,
            marginVertical: 14,
            borderColor: '#BDBDBD',
            borderWidth: 1,
          }}
          inputStyle={{
            textAlign: language === 'ar' ? 'right' : 'left',
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
            color: '#505050',
            marginVertical: -2,
          }}
          right={props => (
            <IconButton
              icon="filter-variant-plus"
              onPress={() => {
                setModalVisible(true);
              }}
            />
          )}
        />
        {/* SEARCH BUTTONS  */}
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal
          keyExtractor={(item: any, index: number) => `${index}search-value`}
          data={Object.entries(value)}
          renderItem={({item: [key, objValue]}: any) => {
            if (objValue.trim().length === 0) {
              return null;
            }
            return (
              <Button
                className="ml-1 min-w-[60px] items-center  rounded-full bg-tertiary"
                icon={() => (
                  <AntDesign
                    name="close"
                    size={16}
                    color="white"
                    onPress={() => {
                      setValue({...value, [key]: ''});
                    }}
                  />
                )}>
                <Text className="font-PoppinsBold text-white">{objValue}</Text>
              </Button>
            );
          }}
        />
      </View>
    );
  }

  if (searchParamsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  }

  function renderOnline() {
    return (
      <View>
        {matchUsersData ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              marginHorizontal: 4,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {matchUsersData?.data.map((item: any, index: number) => (
              <View
                key={`matchUsers${index}`}
                className="mx-2 my-2 h-[168px] w-[155px] items-center rounded-md bg-white p-2">
                <Avatar.Text
                  label={`${helperFirstLetter(
                    item.attributes.first_name || 'A',
                  )}${helperFirstLetter(item.attributes.last_name || 'B')}`}
                  size={50}
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor:
                      item.attributes.status === 'online'
                        ? theme.colors.online
                        : theme.colors.gray,
                    borderWidth: 2.5,
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    marginRight: 8,
                  }}
                />
                <Text className="text-center font-PoppinsBold text-graydark">
                  {item.attributes.first_name}
                </Text>
                <Text className="text-center font-PoppinsRegular text-xs">
                  {item.attributes.position}
                </Text>
                <View className="absolute bottom-1">
                  <Button
                    mode="contained"
                    onPress={() => handlePostRequest(item)}>
                    <Text className="text-xs">{t('sendMessage')}</Text>
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className="h-[168px] flex-col items-center justify-center">
            <Text className="font-PoppinsBold text-white">
              No data has been found
            </Text>
          </View>
        )}
      </View>
    );
  }

  const handlePostRequest = async (item: any) => {
    //@ts-ignore
    navigation.navigate('ChatScreen' as never, {
      receiverId: item?.id,
      currentId: user?.id,
      chatWithFirstName: JSON.stringify(item?.attributes?.first_name),
      chatWithLastName: JSON.stringify(item?.attributes?.last_name),
    });
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <SafeAreaView
        className={`${web ? 'mb-0' : 'mb-16'}`}
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            style={{
              maxWidth: '60%',
              alignSelf: 'center',
              justifyContent: 'center',
              margin: 'auto',
            }}
            contentContainerStyle={{
              backgroundColor: '#fff',
              height: '80%',
              paddingHorizontal: 8,
              marginHorizontal: 8,
              borderRadius: 10,
            }}>
            <Text className="mb-4 w-full p-2 font-PoppinsBold">
              {t('selectFilterOptions')}
            </Text>
            <ScrollView className="mx-1 flex-1 ">
              <Dropdown
                containerStyle={{
                  borderRadius: 10,
                  height: '70%',
                  paddingVertical: 10,
                }}
                mode="modal"
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Country"
                searchPlaceholder="Search..."
                data={countryApi}
                value={value.country}
                onChange={item => {
                  setValue({...value, country: item.label});
                }}
              />
              <Divider bold={true} />
              <List.Section className="flex-1 bg-white ">
                <List.Accordion
                  style={{backgroundColor: '#fff'}}
                  title="Position">
                  <FlatList
                    style={{overflow: 'hidden', height: 200}}
                    keyExtractor={(item: any, index: number) =>
                      `${index}-country`
                    }
                    data={jobTitles}
                    renderItem={({item}) => (
                      <Checkbox.Item
                        label={item}
                        mode="android"
                        status={
                          value.position === item ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setValue({...value, position: item});
                        }}
                      />
                    )}
                  />
                </List.Accordion>
                <Divider bold={true} />
                <List.Accordion
                  style={{backgroundColor: '#fff'}}
                  title="Company">
                  <FlatList
                    style={{overflow: 'hidden', height: 200}}
                    keyExtractor={(item: any, index: number) =>
                      `${index}-country`
                    }
                    data={companies}
                    renderItem={({item}) => (
                      <Checkbox.Item
                        label={item}
                        mode="android"
                        status={
                          value.company === item ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setValue({...value, company: item});
                        }}
                      />
                    )}
                  />
                </List.Accordion>
              </List.Section>
            </ScrollView>
            <Button
              onPress={() => setModalVisible(false)}
              // icon="check"
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 4,
                margin: 20,
                paddingHorizontal: 100,
                maxWidth: '50%',
                alignSelf: 'center',
              }}
              mode="contained">
              <Text className="font-PoppinsRegular">done</Text>
            </Button>
          </Modal>
        </Portal>
        {/* THE PAGE VIEW  */}
        <View className="flex-1">
          {renderOnline()}
          {renderSearchBar()}
          <Text className=" mx-4 py-2 font-PoppinsSemibold ">
            {t('allVisitors')}
          </Text>
          <FlatList
            data={searchResultsData?.data.map((item: any) => item)}
            keyExtractor={(item: any, index: number) => `${index}-online`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handlePostRequest(item)}
                className="mx-2 my-2 rounded-md bg-white p-2  shadow-lg">
                <Card
                  elevation={0}
                  style={{
                    backgroundColor: 'transparent',
                  }}>
                  <Card.Title
                    title={`${item?.attributes.first_name} ${item?.attributes.last_name}`}
                    // subtitle={`${
                    //   item?.attributes.first_name || item?.attributes.first_name
                    // } \n${
                    //   item?.attributes.last_name || item?.attributes.last_name
                    // }`}
                    // subtitleStyle={{
                    //   color: theme.colors.darkGray,
                    //   fontFamily: 'Poppins-Regular',
                    //   textAlign: language === 'ar' ? 'right' : 'left',
                    //   fontSize: 12,
                    // }}
                    titleStyle={{
                      color: theme.colors.darkGray,
                      fontFamily: 'CamptonMedium',
                      textAlign: language === 'ar' ? 'right' : 'left',
                      fontSize: 16,
                      paddingHorizontal: language === 'ar' ? 35 : 20,
                      verticalAlign: 'middle',
                    }}
                    subtitleNumberOfLines={5}
                    left={isAcitve => (
                      <Avatar.Text
                        label={`${helperFirstLetter(
                          item.attributes.first_name || 'A',
                        )}${helperFirstLetter(
                          item.attributes.last_name || 'B',
                        )}`}
                        size={50}
                        style={{
                          backgroundColor: theme.colors.primary,
                          borderColor:
                            item.attributes.status === 'online'
                              ? theme.colors.online
                              : theme.colors.gray,
                          borderWidth: 2.5,
                          width: 64,
                          height: 64,
                          borderRadius: 32,
                        }}
                      />
                    )}
                    right={() => (
                      <View className="flex-row items-center">
                        <Tooltip
                          children={
                            <IconButton
                              style={{
                                transform:
                                  language === 'ar' ? [{scaleX: -1}] : [],
                              }}
                              size={32}
                              iconColor={theme.colors.primary}
                              icon={() => (
                                <Ionicons name="calendar" size={28} />
                              )}
                              onPress={() => {
                                navigation.navigate('MeetingScreen' as never);
                              }}
                            />
                          }
                          title={t('meeting')}
                          enterTouchDelay={DURATION_MEDIUM}
                          leaveTouchDelay={DURATION_LONG}
                        />

                        <Tooltip
                          title={t('sendMessage')}
                          enterTouchDelay={DURATION_MEDIUM}
                          leaveTouchDelay={DURATION_LONG}>
                          <IconButton
                            style={{
                              transform:
                                language === 'ar' ? [{scaleX: -1}] : [],
                            }}
                            icon={require('../../assets/icons/messageIcon.png')}
                            size={32}
                            iconColor={theme.colors.primary}
                            onPress={() => handlePostRequest(item)}
                          />
                        </Tooltip>
                      </View>
                    )}
                    rightStyle={{marginRight: 20}}
                  />
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    border: 'none',
    padding: 19,
    fontSize: 16,
  },
});

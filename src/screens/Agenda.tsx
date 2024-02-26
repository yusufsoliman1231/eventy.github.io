import {View, Platform, Text} from 'react-native';
import {Divider, useTheme, MD3Theme} from 'react-native-paper';
import {useGetAgenda} from '../services/react-query-hooks/get-agenda';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const Agenda = () => {
  const theme = useTheme<MD3Theme>();
  const web = Platform.OS === 'web';
  const {data, isLoading} = useGetAgenda();
  const today = new Date('2023-08-11');
  const {agendaDateFrom, agendaDateTo} = useRoute<any>().params;
  const agendaTabs = createMaterialTopTabNavigator();

  TODO: 'getDayName function it should be in a separate file';

  function getDayName(dateString: string | number | Date) {
    const date = new Date(dateString);
    const options = {weekday: 'long'};
    const dayName = date
      .toLocaleDateString('en-US', options as any)
      .split(',')[0];
    return dayName;
  }

  const agendaDates = [];
  let fromTheDate = new Date(agendaDateFrom); // Create a new Date object
  let toTheDate = new Date(agendaDateTo); // Create a new Date object
  while (fromTheDate <= toTheDate) {
    const year = fromTheDate.getFullYear();
    const month = String(fromTheDate.getMonth() + 1).padStart(2, '0');
    const day = String(fromTheDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    agendaDates.push(formattedDate);
    fromTheDate.setDate(fromTheDate.getDate() + 1);
  }

  // console.log(agendaDates);
  const AgendaHeaders = (props: any) => {
    const routes = props;
    return (
      <View className={`mx-2 ${web ? 'mb-0' : 'mb-16'}  flex-1`}>
        {/* AGENDA CONTENT */}
        <ScrollView className="mt-[2px] flex-1 bg-white">
          {data?.data.map((item: any, index: any) => {
            if (getDayName(item.attributes.end_time) === routes?.route.name) {
              return (
                <View key={`agenda${index}`} className="m-8">
                  <Text className="font-PoppinsBold text-xl ">Event name</Text>
                  <Text>{item.attributes.title}</Text>
                  <View className="mt-2">
                    <View className="my-2 flex-row items-center">
                      <Icon
                        style={{marginRight: 20, marginBottom: 4}}
                        name="calendar-month"
                        size={28}
                        color={theme.colors.primary}
                      />
                      <Text className="font-PoppinsRegular">
                        {routes?.route.name}
                      </Text>
                    </View>
                    <Divider />
                    <View className="my-2  flex-row items-center">
                      <Icon
                        style={{marginRight: 20, marginBottom: 4}}
                        name="clock"
                        size={28}
                        color={theme.colors.primary}
                      />
                      <Text className="font-PoppinsRegular">
                        {`${new Date(
                          item?.attributes.start_time,
                        ).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })} To ${new Date(
                          item?.attributes.end_time,
                        ).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}`}
                      </Text>
                    </View>
                    <Divider />
                    <View className="my-2 flex-row items-center">
                      <Icon
                        style={{marginRight: 20, marginBottom: 4}}
                        name="microphone"
                        size={28}
                        color={theme.colors.primary}
                      />
                      <Text className="font-PoppinsRegular">
                        {data?.included[index]?.attributes.name}
                      </Text>
                    </View>
                    <Divider />
                    <View className="my-2 flex-row items-center">
                      <Ionicons
                        style={{marginRight: 20, marginBottom: 4}}
                        name="location-sharp"
                        size={28}
                        color={theme.colors.primary}
                      />
                      <Text>{item.attributes.location}</Text>
                    </View>
                    <Divider />
                  </View>
                </View>
              );
            }
          })}
          {data?.data.every(
            (item: any) =>
              getDayName(item.attributes.end_time) !== routes?.route.name,
          ) && (
            <View className="mt-32">
              <Text className="text-center font-PoppinsBold">
                No events for this day
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View className="flex-1 ">
      {/* HEADER CALENDER */}
      <agendaTabs.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: theme.colors.primary,
          tabBarLabelStyle: {fontSize: 12, fontFamily: 'Poppins-Bold'},
          tabBarStyle: {
            backgroundColor: '#fff',
            marginHorizontal: 8,
            overflow: 'hidden',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            marginTop: 20,
            paddingVertical: 20,
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
            padding: Platform.OS === 'ios' || Platform.OS === 'web' ? 32 : 33,
            borderRadius: 10,
            marginBottom: 12,
            marginVertical: 10,
            borderWidth: 1,
          },
        }}>
        {agendaDates.map((item: any, index: any) => (
          <agendaTabs.Screen
            key={`agendaTabs${index}`}
            name={
              new Date(item) === today
                ? `${getDayName(item)}\nToday`
                : getDayName(item)
            }
            component={AgendaHeaders}
          />
        ))}
      </agendaTabs.Navigator>
    </View>
  );
};

export default Agenda;

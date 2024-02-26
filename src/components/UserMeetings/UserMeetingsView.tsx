import React, {useRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';

import {getTheme} from './mocks/theme';

import {agendaItems, getMarkedDates} from './mocks/agendaItems';
import AgendaItem from './mocks/AgendaItem';

const leftArrowIcon = require('./img/previous.png');
const rightArrowIcon = require('./img/next.png');
const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const {weekView} = props;
  const marked = useRef(getMarkedDates());

  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item} />;
  }, []);
  const theme = useRef(getTheme());

  return (
    <CalendarProvider
      date={ITEMS[1]?.title}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      // todayBottomMargin={16}
    >
      {/* {!weekView ? (
        <WeekCalendar
          testID={'weekCalendar'}
          firstDay={1}
          markedDates={marked.current}
          theme={theme.current}
          // allowSelectionOutOfRange={false}
          hideDayNames={false}
        />
        
      ) : (
        <ExpandableCalendar
          theme={theme.current}
          testID={'expandableCalendar'}
          // horizontal={false}
          // hideArrows
          // disablePan
          hideKnob
          initialPosition={ExpandableCalendar.positions.CLOSED}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          animateScroll
          // closeOnDayPress={false}
        />
      )} */}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        scrollToNextEvent
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    color: 'grey',
    textTransform: 'capitalize',
  },
});

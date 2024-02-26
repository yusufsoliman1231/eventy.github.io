import React, {useState, useRef} from 'react';
import {Animated, TouchableOpacity, Text, FlatList, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
export default function AnimatedAccordion({
  title,
  data,
  value,
  setValue,
  field,
}: any) {
  const [expanded, setExpanded] = useState(false);
  const dropDownAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = new Animated.Value(0); // Initial value for opacity: 0

  const toggleExpanded = () => {
    setExpanded(!expanded);
    Animated.timing(dropDownAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,

      useNativeDriver: false,
    }).start();
  };

  Animated.timing(rotateAnimation, {
    toValue: expanded ? 1 : 0,
    duration: 500,
    useNativeDriver: true,
  }).start();

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const maxHeight = data.length * 50; // Replace 50 with the height of your items

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 16,
          paddingHorizontal: 10,
        }}>
        <Text>{title}</Text>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <AntDesign name="right" size={24} color="black" />
        </Animated.View>
      </View>
      <Animated.View
        style={{
          height: dropDownAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maxHeight],
          }),
          overflow: 'hidden',
        }}>
        <FlatList
          keyExtractor={(item, index) => `${index}-animated-accordion`}
          data={data}
          renderItem={({item}) => (
            <Checkbox.Item
              label={item}
              mode="android"
              status={value[field] === item ? 'checked' : 'unchecked'}
              onPress={() => setValue({...value, [field]: item})}
            />
          )}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

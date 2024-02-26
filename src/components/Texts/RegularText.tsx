import {Text} from 'react-native';
import React, {FC} from 'react';
import {TextProps} from './types';

const RegularText: FC<TextProps> = ({textStyles, children}) => {
  return (
    <Text
      style={{fontFamily: 'Poppins-Bold'}}
      className={`text-left text-[14px] ${textStyles}`}>
      {children}
    </Text>
  );
};

export default RegularText;

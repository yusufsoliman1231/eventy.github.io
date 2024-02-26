import {Text} from 'react-native';
import React, {FC} from 'react';
import {TextProps} from './types';

const SmallText: FC<TextProps> = ({textStyles, children}) => {
  return (
    <Text
      style={{fontFamily: 'Poppins-Regular'}}
      className={`text-left text-[14px] ${textStyles}`}>
      {children}
    </Text>
  );
};

export default SmallText;

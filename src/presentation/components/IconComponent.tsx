import React from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import {colors} from '../../theme/colors';

type IconType = typeof MaterialIcons | typeof SimpleLineIcons;

export interface PropIcons {
  type: IconType;
  name: string;
  color?: string;
  size?: number;
  style?: TextStyle | ViewStyle | ImageStyle;
  onPress?: () => void;
}

export const Icons = {
  MaterialIcons,
  SimpleLineIcons,
  Zocial,
};

const Icon: React.FC<PropIcons> = ({type, name, size = 26, style, color = colors.ui.fucsia}) => {
  const Tag = type;
  return <>{type && name && <Tag name={name} size={size} color={color} style={style} />}</>;
};

export default Icon;

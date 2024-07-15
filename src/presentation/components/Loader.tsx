import React from 'react';
import {colors} from '../../theme/colors';
import {ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <ActivityIndicator
      size={'small'}
      style={{width: 50, height: 50, alignSelf: 'center'}}
      color={colors.ui.quaternary}
    />
  );
};

export default Loader;

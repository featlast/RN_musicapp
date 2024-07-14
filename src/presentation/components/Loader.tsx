import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import {colors} from '../../theme/colors';

const Loader = () => {
  return (
    <LoaderKit
      style={{width: 50, height: 50, alignSelf: 'center'}}
      name={'BallPulseSync'}
      color={colors.ui.quaternary}
    />
  );
};

export default Loader;

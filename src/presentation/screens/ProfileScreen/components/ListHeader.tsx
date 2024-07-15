import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../theme/colors';

export const ListHeader: React.FC = () => (
  <View style={styles.containerList}>
    <Text style={styles.txtTitle}>Mis Canciones Favoritas</Text>
  </View>
);

const styles = StyleSheet.create({
  containerList: {
    // backgroundColor: colors.ui.disabled,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  txtTitle: {fontWeight: 'bold', color: colors.ui.fucsia},
});

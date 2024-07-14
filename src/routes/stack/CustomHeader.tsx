import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMusic from 'react-native-vector-icons/SimpleLineIcons';
import {type NavigationProp, useNavigation, useRoute} from '@react-navigation/native';

import {colors} from '../../theme/colors';
import {RootStackParams} from './MyStackNavigationScreens';

const CustomHeader: React.FC<{title: string}> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: colors.ui.disabled,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          paddingLeft: 15,
        }}>
        {route.name !== 'Home' && (
          <Icon
            name="arrow-back-ios"
            size={24}
            color={colors.ui.quaternary}
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingRight: 15,
        }}>
        <IconMusic
          name="playlist"
          size={24}
          color={colors.ui.quaternary}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
